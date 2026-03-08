---
name: AgentUp
description: AI agent that builds production-ready Go backends from natural language. Search Go best practices, analyze project ideas, generate complete projects — all locally.
---

# AgentUp — Go Backend Generator

## When User Requests Go Work

Follow this workflow for every Go-related task:

### 1. Analyze Requirements
Extract from the user's request:
- **Project type**: REST API, CLI, microservice, library, serverless
- **Domain**: web, database, gRPC, messaging
- **Constraints**: stdlib only? specific framework? Kubernetes?
- **Scale**: small project, enterprise, library

### Default Stack (always use unless user specifies otherwise)
| Component | Default | Package |
|-----------|---------|---------|
| **Database** | **PostgreSQL** | `github.com/lib/pq` |
| **Router** | Chi v5 | `github.com/go-chi/chi/v5` |
| **Auth** | JWT | `github.com/golang-jwt/jwt/v5` |
| **Query** | database/sql | stdlib |
| **Migration** | Raw SQL files | `migrations/*.sql` |
| **Config** | ENV vars | `os.LookupEnv` |
| **Deploy** | Docker Compose | `Dockerfile` + `docker-compose.yml` |

**Project structure**: Domain-driven layout:
```
cmd/api/main.go
internal/config/       — env config
internal/domain/       — structs + request types
internal/handler/      — HTTP handlers (Chi)
internal/service/      — business logic
internal/repository/   — PostgreSQL queries
internal/middleware/    — auth, cors, logger
migrations/            — SQL migration files
```

### 2. Generate Architecture System (REQUIRED for new projects)
```bash
python3 .agent/skills/agentup/scripts/search.py "<project description>" --arch-system -p "ProjectName"
```
This gives you: architecture, packages, error strategy, patterns, structure, testing approach.

### 3. Supplement with Domain Searches
Based on the project needs, search relevant domains:
```bash
# Patterns for the task
python3 .agent/skills/agentup/scripts/search.py "functional options config" --domain pattern

# Error handling approach
python3 .agent/skills/agentup/scripts/search.py "error wrapping context" --domain error

# Concurrency patterns
python3 .agent/skills/agentup/scripts/search.py "worker pool bounded" --domain concurrency

# Performance tips
python3 .agent/skills/agentup/scripts/search.py "http connection pooling" --domain perf

# Testing patterns
python3 .agent/skills/agentup/scripts/search.py "table driven httptest" --domain test
```

### 4. Stack Guidelines
If using a specific framework/stack:
```bash
python3 .agent/skills/agentup/scripts/search.py "middleware authentication" --stack web-gin
python3 .agent/skills/agentup/scripts/search.py "cobra subcommands config" --stack cli
python3 .agent/skills/agentup/scripts/search.py "interceptor logging" --stack grpc
```

### 5. Implement
Apply all recommendations from the search results:
- Use recommended architecture and project structure
- Apply patterns (Functional Options, Repository Interface, etc.)
- Follow error handling strategy
- Implement proper concurrency patterns
- Add tests following testing strategy

### 6. Always Generate Docker Files
Every project MUST include these files:

**Dockerfile** (multi-stage build):
```dockerfile
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /bin/api ./cmd/api

FROM alpine:3.20
RUN apk add --no-cache ca-certificates tzdata
COPY --from=builder /bin/api /bin/api
COPY migrations/ /app/migrations/
EXPOSE 8080
CMD ["/bin/api"]
```

**docker-compose.yml** (API + PostgreSQL):
```yaml
services:
  api:
    build: .
    ports:
      - "8080:8080"
    environment:
      - DATABASE_URL=postgres://postgres:postgres@db:5432/appdb?sslmode=disable
      - JWT_SECRET=change-me
      - PORT=8080
    depends_on:
      db:
        condition: service_healthy
  db:
    image: postgres:16-alpine
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: appdb
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./migrations:/docker-entrypoint-initdb.d
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5
volumes:
  pgdata:
```

**Makefile** (must include):
```makefile
dev:
	go run ./cmd/api
build:
	go build -o bin/api ./cmd/api
test:
	go test -race -cover ./...
docker-up:
	docker-compose up -d --build
docker-down:
	docker-compose down
```

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

## Resources

- **scripts/**: BM25 search engine, architecture system generator
- **data/**: 13 CSV databases with 300+ curated Go entries
- **Resources**: Go best practices across 12 domains and 10 stacks
