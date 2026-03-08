import * as fs from "fs";
import * as path from "path";
import { renderTemplate } from "../utils/template.js";

interface InitOptions {
  platform: string;
  lang?: string;
  dir: string;
  noFrontend?: boolean;
}

// Skills are bundled in the npm package at cli/skills/
// After tsc: dist/commands/init.js → ../../skills = cli/skills/
const BUNDLED_SKILLS_DIR = path.join(__dirname, "..", "..", "skills");

const PLATFORMS: Record<string, { skillsBase: string; configFile: string; configName: string }> = {
  claude: {
    skillsBase: ".claude/skills",
    configFile: "CLAUDE.md",
    configName: "Claude Code",
  },
  cursor: {
    skillsBase: ".cursor/skills",
    configFile: ".cursorrules",
    configName: "Cursor",
  },
  windsurf: {
    skillsBase: ".windsurf/skills",
    configFile: ".windsurfrules",
    configName: "Windsurf",
  },
  antigravity: {
    skillsBase: ".agent/skills",
    configFile: ".agent/SKILL.md",
    configName: "Google Antigravity",
  },
};

const LANGUAGES: Record<string, { dir: string; label: string }> = {
  go: { dir: "go", label: "Go Backend" },
  nodejs: { dir: "nodejs", label: "Node.js / TypeScript" },
  rust: { dir: "rust", label: "Rust" },
};

function copyDirRecursive(src: string, dest: string): void {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function findSkillTemplate(skillDir: string): string | null {
  const candidates = [
    path.join(skillDir, "templates", "base", "skill-content.md"),
    path.join(skillDir, "templates", "platforms", "skill-content.md"),
    path.join(skillDir, "SKILL.md"),
  ];
  return candidates.find((p) => fs.existsSync(p)) ?? null;
}

async function promptPlatform(): Promise<string> {
  const { default: inquirer } = await import("inquirer");
  const { platform } = await inquirer.prompt([
    {
      type: "list",
      name: "platform",
      message: "Select your AI coding platform:",
      choices: Object.entries(PLATFORMS).map(([value, { configName }]) => ({
        name: configName,
        value,
      })),
    },
  ]);
  return platform;
}

async function promptLanguages(): Promise<string[]> {
  const { default: inquirer } = await import("inquirer");
  const { langs } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "langs",
      message: "Select language skills to install:",
      choices: Object.entries(LANGUAGES).map(([value, { label }]) => ({
        name: label,
        value,
        checked: value === "go",
      })),
    },
  ]);
  return langs as string[];
}

export async function initCommand(options: InitOptions): Promise<void> {
  console.log("");
  console.log("  ╔════════════════════════════════════════╗");
  console.log("  ║          Welcome to AgentUp!           ║");
  console.log("  ║  AI skills for production-grade code   ║");
  console.log("  ╚════════════════════════════════════════╝");
  console.log("");

  // Validate skills bundle exists
  if (!fs.existsSync(BUNDLED_SKILLS_DIR)) {
    console.error(`  Error: Skills bundle not found at ${BUNDLED_SKILLS_DIR}`);
    console.error(`  Please reinstall: npm install -g @agentup/cli\n`);
    process.exit(1);
  }

  // Resolve platform (prompt if not provided or invalid)
  let platform = options.platform.toLowerCase();
  if (!PLATFORMS[platform]) {
    console.log(`  Unknown platform "${platform}", let's pick one:\n`);
    platform = await promptPlatform();
  }
  const platformConfig = PLATFORMS[platform];
  const targetDir = path.resolve(options.dir);

  // Resolve languages
  let selectedLangs: string[] = [];
  if (options.lang) {
    const requested = options.lang.split(",").map((l) => l.trim().toLowerCase());
    const invalid = requested.filter((l) => !LANGUAGES[l]);
    if (invalid.length > 0) {
      console.error(`  Unknown language(s): ${invalid.join(", ")}`);
      console.error(`  Available: ${Object.keys(LANGUAGES).join(", ")}\n`);
      process.exit(1);
    }
    selectedLangs = requested;
  } else {
    selectedLangs = await promptLanguages();
    if (selectedLangs.length === 0) {
      console.log("  No languages selected, defaulting to Go.\n");
      selectedLangs = ["go"];
    }
  }

  // Always include frontend unless --no-frontend
  const installFrontend = !options.noFrontend;
  const frontendSkillSrc = path.join(BUNDLED_SKILLS_DIR, "frontend");
  const hasFrontendSkill = fs.existsSync(frontendSkillSrc);

  console.log(`  Platform  : ${platformConfig.configName}`);
  console.log(`  Languages : ${selectedLangs.map((l) => LANGUAGES[l].label).join(", ")}${installFrontend && hasFrontendSkill ? " + UI/UX Frontend" : ""}`);
  console.log(`  Directory : ${targetDir}`);
  console.log("");

  const configPath = path.join(targetDir, platformConfig.configFile);
  const configSections: string[] = [];

  // Install each language skill
  for (const lang of selectedLangs) {
    const langInfo = LANGUAGES[lang];
    const skillSrc = path.join(BUNDLED_SKILLS_DIR, langInfo.dir);

    if (!fs.existsSync(skillSrc)) {
      console.log(`  Warning: ${langInfo.label} skill not found in bundle, skipping.\n`);
      continue;
    }

    const skillDest = path.join(targetDir, platformConfig.skillsBase, lang);
    console.log(`  Installing ${langInfo.label} skill to ${platformConfig.skillsBase}/${lang}...`);

    try {
      copyDirRecursive(skillSrc, skillDest);
      console.log(`  Done.\n`);
    } catch (err) {
      console.error(`  Error installing ${langInfo.label} skill: ${err}\n`);
      process.exit(1);
    }

    // Collect config content for this skill
    const templatePath = findSkillTemplate(skillSrc);
    if (templatePath) {
      const content = renderTemplate(templatePath, {
        platform,
        skillDir: `${platformConfig.skillsBase}/${lang}`,
        searchCommand: `python3 ${platformConfig.skillsBase}/${lang}/scripts/search.py`,
      });
      configSections.push(content);
    }
  }

  // Install frontend skill
  if (installFrontend && hasFrontendSkill) {
    const frontendDest = path.join(targetDir, platformConfig.skillsBase, "frontend");
    console.log(`  Installing UI/UX Frontend skill to ${platformConfig.skillsBase}/frontend...`);

    try {
      copyDirRecursive(frontendSkillSrc, frontendDest);
      console.log(`  Done.\n`);
    } catch (err) {
      console.error(`  Warning: Could not install frontend skill: ${err}\n`);
    }

    const frontendTemplate = findSkillTemplate(frontendSkillSrc);
    if (frontendTemplate) {
      const content = renderTemplate(frontendTemplate, {
        platform,
        skillDir: `${platformConfig.skillsBase}/frontend`,
        searchCommand: `python3 ${platformConfig.skillsBase}/frontend/scripts/search.py`,
      });
      configSections.push(content);
    }
  }

  // Write config file
  if (configSections.length > 0) {
    const combined = configSections.join("\n\n---\n\n");
    console.log(`  Creating ${platformConfig.configFile}...`);

    try {
      if (fs.existsSync(configPath)) {
        const existing = fs.readFileSync(configPath, "utf-8");
        if (!existing.includes("AgentUp") && !existing.includes("GoSkill")) {
          fs.appendFileSync(configPath, "\n\n" + combined);
          console.log(`  Appended to existing ${platformConfig.configFile}.\n`);
        } else {
          console.log(`  ${platformConfig.configFile} already configured.\n`);
        }
      } else {
        fs.mkdirSync(path.dirname(configPath), { recursive: true });
        fs.writeFileSync(configPath, combined, "utf-8");
        console.log(`  Done.\n`);
      }
    } catch (err) {
      console.error(`  Error writing config: ${err}\n`);
    }
  }

  // Summary
  console.log("  ════════════════════════════════════════");
  console.log("  Installation complete!\n");
  console.log("  Installed skills:");
  for (const lang of selectedLangs) {
    console.log(`    ${platformConfig.skillsBase}/${lang}/`);
  }
  if (installFrontend && hasFrontendSkill) {
    console.log(`    ${platformConfig.skillsBase}/frontend/`);
  }
  console.log(`    Config: ${platformConfig.configFile}`);
  console.log("");
}
