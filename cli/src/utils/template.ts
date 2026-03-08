import * as fs from "fs";

interface TemplateVars {
  platform: string;
  skillDir: string;
  searchCommand: string;
}

/**
 * Render a template file with variable substitution.
 * Replaces {{variable}} placeholders with actual values.
 */
export function renderTemplate(
  templatePath: string,
  vars: TemplateVars
): string {
  let content: string;

  try {
    content = fs.readFileSync(templatePath, "utf-8");
  } catch {
    // Fallback content if template not found
    content = generateFallbackContent(vars);
  }

  // Replace template variables
  content = content.replace(/\{\{platform\}\}/g, vars.platform);
  content = content.replace(/\{\{skillDir\}\}/g, vars.skillDir);
  content = content.replace(/\{\{searchCommand\}\}/g, vars.searchCommand);

  // Replace search command paths in code blocks
  content = content.replace(
    /python3 src\/goskill\/scripts\/search\.py/g,
    vars.searchCommand
  );

  return content;
}

function generateFallbackContent(vars: TemplateVars): string {
  return `# GoSkill

## Search Command

\`\`\`bash
${vars.searchCommand} "<query>" --domain <domain>
\`\`\`

**Available domains:** pattern, package, error, perf, test, concurrency, interface, arch, idiom, anti, tooling, module

**Available stacks:** web-gin, web-echo, web-fiber, web-stdlib, cli, grpc, database, microservice, cloud-native, data-pipeline

**Architecture system:**
\`\`\`bash
${vars.searchCommand} "<query>" --arch-system -p "ProjectName"
\`\`\`

## Prerequisites
Python 3.x (no external dependencies required)
`;
}
