# PHPSkill — Workflow

## When User Requests PHP Work

Follow this workflow for every PHP-related task:

### 1. Analyze Requirements

Extract from the user's request:

- **Project type**: REST API, web app, SaaS, microservice, library, CLI tool
- **Domain**: web, database, queue, real-time, file processing
- **Constraints**: specific framework? Specific PHP version? Docker? Serverless?
- **Scale**: small project, enterprise, library for public use?

### 2. Generate Architecture System (REQUIRED for new projects)

```bash
python3 skills/php/scripts/search.py "<project description>" --arch-system -p "ProjectName"
```

This gives you: architecture, packages, error strategy, patterns, structure, testing approach.

### 3. Supplement with Domain Searches

Based on the project needs, search relevant domains:

```bash
# Patterns for the task
python3 skills/php/scripts/search.py "repository service layer" --domain pattern

# Error handling approach
python3 skills/php/scripts/search.py "custom exception handler" --domain error

# Security patterns
python3 skills/php/scripts/search.py "sql injection csrf" --domain security

# Performance tips
python3 skills/php/scripts/search.py "opcache query optimization" --domain perf

# Testing patterns
python3 skills/php/scripts/search.py "feature test factory mock" --domain test
```

### 4. Stack Guidelines

If using a specific framework/stack:

```bash
python3 skills/php/scripts/search.py "middleware authentication" --stack laravel
python3 skills/php/scripts/search.py "doctrine entity mapping" --stack symfony
python3 skills/php/scripts/search.py "component reactive" --stack livewire
```

### 5. Implement

Apply all recommendations from the search results:

- Use recommended architecture and project structure
- Apply patterns (Repository, Service Layer, DTO, Action Classes)
- Follow error handling strategy
- Implement security best practices
- Add tests following testing strategy

## Pre-Delivery Checklist

Before delivering PHP code, verify:

- [ ] `./vendor/bin/phpstan analyse` passes (level 6+)
- [ ] `./vendor/bin/pint --test` passes (code style)
- [ ] `./vendor/bin/phpunit` passes (all tests)
- [ ] `declare(strict_types=1)` in every PHP file
- [ ] All user input validated (Form Requests or validate())
- [ ] No `$request->all()` in create/update calls
- [ ] CSRF protection enabled for web routes
- [ ] Mass assignment protected ($fillable defined)
- [ ] N+1 queries prevented (eager loading)
- [ ] Sensitive data not logged or exposed
- [ ] Passwords hashed with bcrypt/Argon2
- [ ] APP_DEBUG=false in production config
- [ ] API responses use Resources (not raw models)
- [ ] Database operations wrapped in transactions where needed
- [ ] Dockerfile and docker-compose.yml included
- [ ] Queue jobs have retry/failure handling

## Quick Domain Reference

| Domain       | When to Search                                                 |
| ------------ | -------------------------------------------------------------- |
| `pattern`    | Need a design pattern (repository, service, factory, strategy) |
| `package`    | Choosing a Composer package for a use case                     |
| `error`      | Error handling strategy, custom exceptions, logging            |
| `perf`       | Performance optimization, caching, OPcache                     |
| `test`       | Testing approach, factories, mocking, feature tests            |
| `security`   | Security vulnerabilities, OWASP, input validation              |
| `interface`  | Interface design, type safety, SOLID principles                |
| `arch`       | Project structure, architecture decisions                      |
| `idiom`      | PHP conventions, modern features, PSR standards                |
| `anti`       | Avoiding common mistakes                                       |
| `tooling`    | PHP tools, static analysis, debugging                          |
| `dependency` | Composer, autoloading, dependency management                   |
