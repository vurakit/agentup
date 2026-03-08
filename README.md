# AgentUp

![Version](https://img.shields.io/badge/version-1.2.0-blue)
![Languages](https://img.shields.io/badge/languages-Go%20%7C%20Node.js%20%7C%20Rust-green)
![Platforms](https://img.shields.io/badge/platforms-Claude%20%7C%20Cursor%20%7C%20Windsurf-purple)
![Python](https://img.shields.io/badge/python-3.x-yellow)
![License](https://img.shields.io/badge/license-MIT-orange)

**AI skills that make your coding assistant write production-grade code.**

AgentUp injects curated knowledge — design patterns, package recommendations, architecture guidelines, and best practices — directly into your AI coding environment. One command, instant upgrade.

---

## Quick Start

```bash
npx @agentup/cli init
```

Pick your platform and languages interactively, or pass flags directly:

```bash
npx @agentup/cli init --platform claude --lang go
npx @agentup/cli init --platform cursor --lang nodejs
npx @agentup/cli init --platform windsurf --lang go,nodejs
npx @agentup/cli init --platform antigravity --lang rust
npx @agentup/cli init --platform claude --lang rust --no-frontend
```

**Supported platforms:** `claude` · `cursor` · `windsurf` · `antigravity`

**Supported languages:** `go` · `nodejs` · `rust`

**Frontend skill** (UI/UX) is installed by default alongside any language skill.

---

## What Gets Installed

Running `agentup init` copies skill files into your project:

```
your-project/
└── .claude/skills/          # (or .cursor/skills/, .windsurf/skills/)
    ├── go/
    │   ├── data/            # 13 CSV knowledge databases
    │   ├── scripts/         # BM25 search engine (Python, zero deps)
    │   └── templates/
    ├── nodejs/
    │   ├── data/            # 14 CSV knowledge databases
    │   └── scripts/
    ├── rust/
    │   ├── data/            # 14 CSV knowledge databases
    │   └── scripts/
    └── frontend/
        ├── data/            # UI/UX knowledge databases
        └── scripts/
```

It also appends the skill workflow to your AI config file (`CLAUDE.md`, `.cursorrules`, `.windsurfrules`), so your AI assistant automatically uses it.

---

## Skills

### Go Backend

13 searchable knowledge domains for production Go code.

| Domain | Coverage |
|--------|----------|
| `pattern` | Functional Options, Table-Driven, Middleware, Pipeline, Repository... |
| `package` | Package recommendations by use case |
| `error` | errors.Is, fmt.Errorf %w, sentinel errors, custom types |
| `concurrency` | Goroutines, channels, worker pools, context cancellation |
| `perf` | Allocations, profiling, sync.Pool, connection pooling |
| `test` | Table-driven, httptest, fuzzing, benchmarks, mocking |
| `interface` | Interface design, composition, contracts |
| `arch` | Project structure, Clean Architecture, DDD |
| `idiom` | Go conventions, naming, style |
| `anti` | Common anti-patterns to avoid |
| `tooling` | go vet, golangci-lint, pprof, dlv |
| `module` | Go modules, versioning, workspaces |

**10 stack guidelines:** `web-gin` · `web-echo` · `web-fiber` · `web-stdlib` · `grpc` · `cli` · `database` · `microservice` · `cloud-native` · `data-pipeline`

**Architecture generator:** multi-domain search that produces complete project architecture, package choices, error strategy, and folder structure.

---

### Node.js / TypeScript

14 searchable knowledge domains for production Node.js/TypeScript code.

| Domain | Coverage |
|--------|----------|
| `pattern` | Factory, Strategy, Middleware, Decorator, Observer... |
| `package` | Package recommendations by use case |
| `error` | Custom error classes, Result types, error boundaries |
| `async` | Promises, async/await, concurrency patterns |
| `typescript` | Generics, discriminated unions, utility types, decorators |
| `perf` | Event loop, memory leaks, clustering, caching |
| `test` | Vitest, mocking, integration tests, snapshot tests |
| `arch` | Modular monolith, Clean Architecture, feature folders |
| `idiom` | Node.js conventions, ESM, barrel exports |
| `anti` | Callback hell, blocking I/O, memory leaks |
| `tooling` | ESLint, Prettier, tsx, esbuild, turborepo |
| `module` | npm workspaces, monorepo, versioning |

**12 stack guidelines:** `web-express` · `web-fastify` · `web-nestjs` · `web-hono` · `web-nextjs` · `web-remix` · `orm-prisma` · `orm-drizzle` · `database` · `graphql` · `auth` · `realtime`

---

### Rust

14 searchable knowledge domains for production Rust code.

| Domain | Coverage |
|--------|----------|
| `pattern` | Builder, Newtype, Typestate, RAII, Iterator adaptor... |
| `crate` | Crate recommendations by use case |
| `error` | thiserror, anyhow, custom error types, Result chaining |
| `concurrency` | Tokio tasks, channels, Mutex, RwLock, rayon |
| `trait` | Trait objects, blanket impls, associated types |
| `perf` | Zero-cost abstractions, SIMD, allocator, profiling |
| `test` | Unit, integration, property-based, cargo-nextest |
| `arch` | Domain-driven design, hexagonal, workspace layout |
| `idiom` | Ownership, borrowing, lifetimes, idiomatic patterns |
| `anti` | Clone overuse, unwrap in prod, blocking async |
| `tooling` | clippy, rustfmt, cargo-audit, flamegraph |
| `module` | Workspace, feature flags, crate versioning |
| `unsafe` | Raw pointers, FFI, unsafe blocks, soundness |

**11 stack guidelines:** `web-axum` · `web-actix` · `web-warp` · `web-rocket` · `grpc` · `database` · `cli` · `auth` · `async-runtime` · `wasm` · `embedded`

---

### UI/UX Frontend

Installed by default with any language skill. Covers design systems, component patterns, accessibility, and framework-specific best practices.

**13 stack guidelines:** `react` · `nextjs` · `vue` · `nuxtjs` · `svelte` · `astro` · `react-native` · `flutter` · `swiftui` · `jetpack-compose` · `shadcn` · `nuxt-ui` · `html-tailwind`

---

## How It Works

```
Your question → AI coding assistant
                      ↓
              Reads skill workflow from CLAUDE.md / .cursorrules
                      ↓
              Runs: python3 .claude/skills/go/scripts/search.py "query" --domain pattern
                      ↓
              BM25 search engine ranks results from CSV databases
                      ↓
              AI applies the best patterns, packages, and architecture to your code
```

1. **CSV Databases** — Curated, production-tested knowledge in structured CSV files
2. **BM25 Search Engine** — Fast, relevant search with zero Python dependencies
3. **Domain Auto-Detection** — Automatically routes queries to the most relevant domain
4. **Architecture Generator** — Combines multi-domain search with reasoning rules for new projects

---

## Manual Search

Skills can also be used directly from the terminal:

```bash
# Go — domain search
python3 .claude/skills/go/scripts/search.py "worker pool" --domain concurrency
python3 .claude/skills/go/scripts/search.py "error wrapping context" --domain error
python3 .claude/skills/go/scripts/search.py "middleware auth" --stack web-gin

# Go — architecture generator
python3 .claude/skills/go/scripts/search.py "rest api postgres jwt" --arch-system -p "MyAPI"

# Node.js
python3 .claude/skills/nodejs/scripts/search.py "discriminated union" --domain typescript
python3 .claude/skills/nodejs/scripts/search.py "loader action" --stack web-remix

# Rust
python3 .claude/skills/rust/scripts/search.py "typestate pattern" --domain pattern
python3 .claude/skills/rust/scripts/search.py "middleware extractor" --stack web-axum

# Auto-detect domain (no flag needed)
python3 .claude/skills/go/scripts/search.py "goroutine channel pipeline"
```

---

## Repository Structure

```
agentup/
├── skills/
│   ├── go/
│   │   ├── data/                # 13 CSV knowledge databases
│   │   │   ├── patterns.csv
│   │   │   ├── packages.csv
│   │   │   ├── concurrency.csv
│   │   │   ├── ...
│   │   │   └── stacks/          # 10 stack CSVs
│   │   ├── scripts/
│   │   │   ├── search.py        # CLI entry point + BM25 engine
│   │   │   ├── core.py          # Search core
│   │   │   └── arch_system.py   # Architecture generator
│   │   └── templates/
│   ├── nodejs/
│   │   ├── data/                # 14 CSV knowledge databases
│   │   └── scripts/
│   ├── rust/
│   │   ├── data/                # 14 CSV knowledge databases
│   │   └── scripts/
│   └── frontend/
│       ├── data/
│       └── scripts/
└── cli/                         # npm CLI installer (@agentup/cli)
    └── src/
        ├── index.ts
        └── commands/init.ts
```

---

## Prerequisites

- **Python 3.x** — for running skills (no external dependencies)
- **Node.js 18+** — for the CLI installer only

---

## Contributing

Contributions welcome! When adding or editing CSV entries:

- All code examples must compile / run correctly
- Package/crate names must exist on the official registry
- CSV format: proper quoting, UTF-8, LF line endings
- Follow the existing schema for the file you're editing

---

## Support the Project

If AgentUp saves you time, consider buying the author a coffee!

[![PayPal](https://img.shields.io/badge/PayPal-Donate-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/thinhntq)

Every contribution helps keep the skill databases updated and growing. Thank you!

---

## License

MIT
