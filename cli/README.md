# @agentup/cli

CLI tool for **AgentUp** — AI agent that builds production Go backends from natural language. Deploy your Docker apps to any VPS with automatic SSL.

## Installation

```bash
npm install -g @agentup/cli
```

Or run directly with npx:

```bash
npx @agentup/cli <command>
```

**Requirements:** Node.js >= 18.0.0

## Quick Start

```bash
# 1. Activate your license
agentup activate AU-XXXX-XXXX-XXXX

# 2. Install skills into your project
agentup init --platform claude

# 3. Deploy your app
agentup deploy
```

## Commands

### `agentup activate <key>`

Activate a license key and download skill data.

```bash
agentup activate AU-XXXX-XXXX-XXXX
```

**What it does:**
- Validates your license key with the AgentUp API
- Downloads skill data (Go patterns, templates, search engine)
- Saves license locally to `~/.config/agentup/license.json`

**Get a key:** [agentup.cc/pricing](https://agentup.cc/pricing)

---

### `agentup init`

Install AgentUp skills into your current project.

```bash
agentup init --platform <platform> [--dir <directory>]
```

**Options:**

| Option | Description | Default |
|--------|-------------|---------|
| `--platform <platform>` | Target AI platform | `claude` |
| `--dir <directory>` | Project directory | `.` |

**Supported platforms:**

| Platform | Config file | Skill directory |
|----------|------------|-----------------|
| `claude` | `CLAUDE.md` | `.claude/skills/goskill/` |
| `cursor` | `.cursorrules` | `.cursor/skills/goskill/` |
| `windsurf` | `.windsurfrules` | `.windsurf/skills/goskill/` |
| `antigravity` | `.agent/skills/agentup/SKILL.md` | `.agent/skills/agentup/` |

**Examples:**

```bash
# Install for Claude Code
agentup init --platform claude

# Install for Cursor in a specific directory
agentup init --platform cursor --dir ./my-project
```

---

### `agentup deploy`

Deploy your Docker app to a VPS with automatic SSL via Caddy.

```bash
agentup deploy
```

**Prerequisites:**
- Valid license key (activated)
- Git repository with remote origin
- `docker-compose.yml` in project root
- All changes committed and pushed

**Deploy flow:**

1. Verifies your license key
2. Checks for previously deployed projects
   - If found: select a project to **redeploy** (one-click, no re-entering info)
   - Or choose to deploy a new project
3. For new deployments, prompts for:
   - GitHub Personal Access Token (for private repos)
   - Server IP address
   - SSH username and password/PEM key
   - Domain name
   - App port
4. Connects to server via SSH
5. Installs Docker (if needed)
6. Clones your repository
7. Installs and configures Caddy (reverse proxy + auto-SSL)
8. Runs `docker compose up -d --build`
9. Verifies deployment

**DNS setup:** Before deploying, point your domain to your server:

```
app.example.com  →  A Record  →  YOUR_SERVER_IP
```

If using Cloudflare, set DNS to "DNS Only" (gray cloud) for Caddy's automatic SSL.

**Redeployment:** After the first deploy, your project config is saved. Next time you run `agentup deploy`, you can select the project from a list and redeploy with one click.

---

### `agentup status`

Show current license status and available tools.

```bash
agentup status
```

**Output example:**
```
  AgentUp — License Status

  Key:  AU-XXXX-XXXX-XXXX
  Plan: pro

  Checking license status with server...
  Status: ✅ Active

  All 7 tools available:
    🔓 agentup_search     — Go best practices search
    🔓 agentup_analyze    — Project idea analyzer
    🔓 agentup_generate   — Full project generator
    🔓 agentup_scaffold   — Add entities/features
    🔓 agentup_build      — Build + test runner
    🔓 agentup_deploy     — Docker deployment
    🔓 agentup_docs       — API docs generator
```

---

### `agentup deactivate`

Remove license key from this machine.

```bash
agentup deactivate
```

Deletes the local license file at `~/.config/agentup/license.json`. Does not affect your license on the server — you can re-activate on any machine.

---

## Tools

After installing with `agentup init`, these tools are available in your AI coding assistant:

| Tool | Description |
|------|-------------|
| `agentup_search` | Search 300+ Go best practices, patterns, and idioms |
| `agentup_analyze` | Analyze project ideas and suggest architecture |
| `agentup_generate` | Generate complete Go backend projects |
| `agentup_scaffold` | Add entities, features, and endpoints |
| `agentup_build` | Build and test runner |
| `agentup_deploy` | Docker deployment to production |
| `agentup_docs` | API documentation generator |

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `AGENTUP_API` | API base URL (for development) | `https://agentup.cc/api` |

## License

MIT
