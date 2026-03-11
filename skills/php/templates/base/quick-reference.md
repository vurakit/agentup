# PHPSkill — Quick Reference

## Search Commands

### Domain Search

```bash
python3 skills/php/scripts/search.py "<query>" --domain <domain> [-n <max>]
```

### Stack Search

```bash
python3 skills/php/scripts/search.py "<query>" --stack <stack> [-n <max>]
```

### Architecture System

```bash
python3 skills/php/scripts/search.py "<query>" --arch-system -p "Name"
python3 skills/php/scripts/search.py "<query>" --arch-system --persist -p "Name"
```

## Available Domains (12)

| Domain       | CSV                | Rows | Content                             |
| ------------ | ------------------ | ---- | ----------------------------------- |
| `pattern`    | patterns.csv       | ~30  | Design patterns with code examples  |
| `package`    | packages.csv       | ~25  | Composer package recommendations    |
| `error`      | error-handling.csv | ~20  | Error & exception handling patterns |
| `perf`       | performance.csv    | ~20  | Performance optimization tips       |
| `test`       | testing.csv        | ~20  | Testing patterns and tools          |
| `security`   | security.csv       | ~20  | Security vulnerability prevention   |
| `interface`  | interfaces.csv     | ~15  | Interface/OOP design guidelines     |
| `arch`       | architecture.csv   | ~15  | Project architecture patterns       |
| `idiom`      | idioms.csv         | ~20  | PHP idioms and conventions          |
| `anti`       | anti-patterns.csv  | ~20  | Common anti-patterns                |
| `tooling`    | tooling.csv        | ~20  | PHP tools and commands              |
| `dependency` | dependency.csv     | ~15  | Composer/dependency management      |

## Available Stacks (8)

| Stack          | CSV              | Content                                   |
| -------------- | ---------------- | ----------------------------------------- |
| `laravel`      | laravel.csv      | Laravel 11 framework best practices       |
| `symfony`      | symfony.csv      | Symfony framework best practices          |
| `codeigniter`  | codeigniter.csv  | CodeIgniter 4 best practices              |
| `slim`         | slim.csv         | Slim micro-framework (PSR-7/15)           |
| `api-platform` | api-platform.csv | API Platform (Symfony-based REST/GraphQL) |
| `livewire`     | livewire.csv     | Laravel Livewire reactive components      |
| `database`     | database.csv     | Eloquent, Doctrine, PDO patterns          |
| `queue`        | queue.csv        | Queue/job processing patterns             |

## Common Queries

```bash
# Patterns
python3 search.py "repository pattern" --domain pattern
python3 search.py "middleware decorator" --domain pattern
python3 search.py "service layer" --domain pattern

# Packages
python3 search.py "http client" --domain package
python3 search.py "image processing" --domain package
python3 search.py "queue message" --domain package

# Error Handling
python3 search.py "custom exception" --domain error
python3 search.py "api error response" --domain error

# Security
python3 search.py "sql injection prevention" --domain security
python3 search.py "csrf protection" --domain security

# Architecture
python3 search.py "clean architecture" --domain arch
python3 search.py "rest api laravel" --arch-system -p "MyAPI"
```
