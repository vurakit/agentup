# @agentup/cli

CLI installer for **AgentUp** — AI skills that make your coding assistant write production-grade code.

Supports **Go**, **Node.js/TypeScript**, **Rust**, and **UI/UX Frontend**.

## Installation

```bash
npm install -g @agentup/cli
```

Or run directly with npx:

```bash
npx @agentup/cli init
```

**Requirements:** Node.js >= 18.0.0, Python 3.x (for running skills)

## Usage

```bash
agentup init [options]
```

### Interactive mode

```bash
agentup init
```

Prompts you to select platform and languages interactively.

### With flags

```bash
agentup init --platform claude --lang go
agentup init --platform cursor --lang nodejs
agentup init --platform windsurf --lang go,nodejs,rust
agentup init --platform antigravity --lang rust --no-frontend
```

### Options

| Option | Description | Default |
|--------|-------------|---------|
| `--platform <platform>` | Target AI platform | `claude` |
| `--lang <languages>` | Languages to install (comma-separated) | interactive |
| `--no-frontend` | Skip installing the UI/UX Frontend skill | `false` |
| `--dir <directory>` | Target project directory | `.` |

### Supported platforms

| Platform | Config file | Skill directory |
|----------|-------------|-----------------|
| `claude` | `CLAUDE.md` | `.claude/skills/` |
| `cursor` | `.cursorrules` | `.cursor/skills/` |
| `windsurf` | `.windsurfrules` | `.windsurf/skills/` |
| `antigravity` | `.agent/SKILL.md` | `.agent/skills/` |

### Supported languages

| Language | Skill |
|----------|-------|
| `go` | Go Backend — 13 knowledge domains, 10 stack guidelines |
| `nodejs` | Node.js/TypeScript — 14 knowledge domains, 12 stack guidelines |
| `rust` | Rust — 14 knowledge domains, 11 stack guidelines |

**UI/UX Frontend** skill (13 stack guidelines) is installed by default with any language.

## What it does

1. Copies skill files (CSV databases, search scripts, templates) into your project
2. Appends the skill workflow to your AI config file (`CLAUDE.md`, `.cursorrules`, etc.)
3. Your AI assistant automatically uses the skills when writing code

## Example

```bash
$ agentup init --platform claude --lang go

  ╔════════════════════════════════════════╗
  ║          Welcome to AgentUp!           ║
  ║  AI skills for production-grade code   ║
  ╚════════════════════════════════════════╝

  Platform  : Claude Code
  Languages : Go Backend + UI/UX Frontend
  Directory : /path/to/your/project

  Installing Go Backend skill to .claude/skills/go...
  Done.

  Installing UI/UX Frontend skill to .claude/skills/frontend...
  Done.

  Creating CLAUDE.md...
  Done.

  ════════════════════════════════════════
  Installation complete!

  Installed skills:
    .claude/skills/go/
    .claude/skills/frontend/
    Config: CLAUDE.md
```

## Links

- **GitHub:** [github.com/vurakit/agentup](https://github.com/vurakit/agentup)
- **Report issues:** [github.com/vurakit/agentup/issues](https://github.com/vurakit/agentup/issues)

## License

MIT
