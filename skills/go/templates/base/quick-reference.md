# GoSkill — Quick Reference

## Search Commands

### Domain Search
```bash
python3 src/goskill/scripts/search.py "<query>" --domain <domain> [-n <max>]
```

### Stack Search
```bash
python3 src/goskill/scripts/search.py "<query>" --stack <stack> [-n <max>]
```

### Architecture System
```bash
python3 src/goskill/scripts/search.py "<query>" --arch-system -p "Name"
python3 src/goskill/scripts/search.py "<query>" --arch-system --persist -p "Name"
```

## Available Domains (12)

| Domain | CSV | Rows | Content |
|--------|-----|------|---------|
| `pattern` | patterns.csv | ~30 | Design patterns with code examples |
| `package` | packages.csv | ~30 | Package recommendations by use case |
| `error` | error-handling.csv | ~18 | Error handling patterns |
| `perf` | performance.csv | ~25 | Performance optimization tips |
| `test` | testing.csv | ~22 | Testing patterns and tools |
| `concurrency` | concurrency.csv | ~25 | Goroutine & channel patterns |
| `interface` | interfaces.csv | ~20 | Interface design guidelines |
| `arch` | architecture.csv | ~20 | Project architecture patterns |
| `idiom` | idioms.csv | ~30 | Go idioms and conventions |
| `anti` | anti-patterns.csv | ~25 | Common anti-patterns |
| `tooling` | tooling.csv | ~22 | Go tools and commands |
| `module` | modules.csv | ~15 | Go modules best practices |

## Available Stacks (10)

| Stack | CSV | Content |
|-------|-----|---------|
| `web-gin` | web-gin.csv | Gin framework best practices |
| `web-echo` | web-echo.csv | Echo framework best practices |
| `web-fiber` | web-fiber.csv | Fiber framework best practices |
| `web-stdlib` | web-stdlib.csv | net/http stdlib best practices |
| `cli` | cli.csv | CLI app (cobra, viper, bubbletea) |
| `grpc` | grpc.csv | gRPC + protobuf best practices |
| `database` | database.csv | SQL, GORM, sqlx, sqlc patterns |
| `microservice` | microservice.csv | Microservice architecture |
| `cloud-native` | cloud-native.csv | Docker, K8s, cloud-native Go |
| `data-pipeline` | data-pipeline.csv | ETL, streaming, message queues |

## Common Queries

```bash
# Patterns
python3 search.py "functional options" --domain pattern
python3 search.py "middleware decorator" --domain pattern
python3 search.py "worker pool" --domain pattern

# Packages
python3 search.py "web framework" --domain package
python3 search.py "database orm" --domain package
python3 search.py "logging structured" --domain package

# Error Handling
python3 search.py "error wrapping" --domain error
python3 search.py "sentinel errors" --domain error

# Concurrency
python3 search.py "goroutine lifecycle" --domain concurrency
python3 search.py "context cancellation" --domain concurrency

# Architecture
python3 search.py "clean architecture" --domain arch
python3 search.py "rest api" --arch-system -p "MyAPI"
```
