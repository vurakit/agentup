# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

GoSkill is an AI-powered Go intelligence toolkit providing searchable databases of design patterns, package recommendations, error handling strategies, concurrency patterns, performance optimizations, architecture guidelines, interface design, and testing best practices. It works as a skill/workflow for AI coding assistants (Claude Code, Windsurf, Cursor, etc.).

## Search Command

```bash
python3 src/goskill/scripts/search.py "<query>" --domain <domain> [-n <max_results>]
```

**Domain search:**
- `pattern` - Design patterns (Functional Options, Table-Driven, Middleware...)
- `package` - Package recommendations by use case
- `error` - Error handling patterns (errors.Is, fmt.Errorf %w, sentinel...)
- `perf` - Performance optimization tips
- `test` - Testing patterns (table-driven, httptest, fuzzing...)
- `concurrency` - Goroutine & channel patterns
- `interface` - Interface design guidelines
- `arch` - Project architecture patterns
- `idiom` - Go idioms and conventions
- `anti` - Anti-patterns to avoid
- `tooling` - Go tools and commands
- `module` - Go modules best practices

**Stack search:**
```bash
python3 src/goskill/scripts/search.py "<query>" --stack <stack>
```
Available stacks: `web-gin`, `web-echo`, `web-fiber`, `web-stdlib`, `cli`, `grpc`, `database`, `microservice`, `cloud-native`, `data-pipeline`

**Architecture system:**
```bash
python3 src/goskill/scripts/search.py "<query>" --arch-system [-p "Project Name"]
```

## Prerequisites
Python 3.x (no external dependencies required)
