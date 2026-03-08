# GoSkill — Workflow

## When User Requests Go Work

Follow this workflow for every Go-related task:

### 1. Analyze Requirements
Extract from the user's request:
- **Project type**: REST API, CLI, microservice, library, serverless, etc.
- **Domain**: web, database, gRPC, messaging, etc.
- **Constraints**: stdlib only? specific framework? Kubernetes? specific Go version?
- **Scale**: small project, enterprise, library for public use?

### 2. Generate Architecture System (REQUIRED for new projects)
```bash
python3 src/goskill/scripts/search.py "<project description>" --arch-system -p "ProjectName"
```
This gives you: architecture, packages, error strategy, patterns, structure, testing approach.

### 3. Supplement with Domain Searches
Based on the project needs, search relevant domains:
```bash
# Patterns for the task
python3 src/goskill/scripts/search.py "functional options config" --domain pattern

# Error handling approach
python3 src/goskill/scripts/search.py "error wrapping context" --domain error

# Concurrency patterns
python3 src/goskill/scripts/search.py "worker pool bounded" --domain concurrency

# Performance tips
python3 src/goskill/scripts/search.py "http connection pooling" --domain perf

# Testing patterns
python3 src/goskill/scripts/search.py "table driven httptest" --domain test
```

### 4. Stack Guidelines
If using a specific framework/stack:
```bash
python3 src/goskill/scripts/search.py "middleware authentication" --stack web-gin
python3 src/goskill/scripts/search.py "cobra subcommands config" --stack cli
python3 src/goskill/scripts/search.py "interceptor logging" --stack grpc
```

### 5. Implement
Apply all recommendations from the search results:
- Use recommended architecture and project structure
- Apply patterns (Functional Options, Repository Interface, etc.)
- Follow error handling strategy
- Implement proper concurrency patterns
- Add tests following testing strategy

## Pre-Delivery Checklist

Before delivering Go code, verify:

- [ ] `go vet ./...` passes
- [ ] `golangci-lint run` passes
- [ ] `go test -race ./...` passes
- [ ] No goroutine leaks (all goroutines have shutdown path)
- [ ] All errors handled (no `_ = f()`)
- [ ] Context propagated through all layers
- [ ] `http.Response.Body` closed with `defer`
- [ ] Exported types have doc comments
- [ ] No global mutable state
- [ ] Interfaces defined at consumer, not provider
- [ ] Struct fields ordered for alignment (largest to smallest)
- [ ] `strings.Builder` used instead of `+` concatenation in loops
- [ ] Database connections properly pooled and closed
- [ ] Graceful shutdown implemented for servers

## Quick Domain Reference

| Domain | When to Search |
|--------|---------------|
| `pattern` | Need a design pattern (options, factory, middleware, pipeline) |
| `package` | Choosing a library/package for a use case |
| `error` | Error handling strategy, wrapping, custom errors |
| `perf` | Performance optimization, profiling, allocation |
| `test` | Testing approach, mocking, benchmarks |
| `concurrency` | Goroutines, channels, sync primitives |
| `interface` | Interface design, composition, contracts |
| `arch` | Project structure, architecture decisions |
| `idiom` | Go conventions, naming, style |
| `anti` | Avoiding common mistakes |
| `tooling` | Go tools, linting, profiling |
| `module` | Go modules, versioning, dependencies |
