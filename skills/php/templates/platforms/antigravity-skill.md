---
name: AgentUp PHP
description: AI agent that builds production-ready PHP backends from natural language. Search PHP best practices, analyze project ideas, generate complete projects — all locally.
---

# AgentUp — PHP Backend Generator

## When User Requests PHP Work

Follow this workflow for every PHP-related task:

### 1. Analyze Requirements

Extract from the user's request:

- **Project type**: REST API, web app, SaaS, microservice, library, CLI
- **Domain**: web, database, queue, real-time, file processing
- **Constraints**: specific framework? Specific PHP version? Docker? Serverless?
- **Scale**: small project, enterprise, library

### Default Stack (always use unless user specifies otherwise)

| Component           | Default         | Package                             |
| ------------------- | --------------- | ----------------------------------- |
| **Framework**       | **Laravel 11**  | `laravel/laravel`                   |
| **Database**        | **MySQL 8**     | `illuminate/database`               |
| **Cache**           | Redis           | `predis/predis`                     |
| **Auth**            | Sanctum         | `laravel/sanctum`                   |
| **Queue**           | Redis           | `laravel/horizon`                   |
| **Static Analysis** | PHPStan Level 6 | `phpstan/phpstan`                   |
| **Code Style**      | Laravel Pint    | `laravel/pint`                      |
| **Testing**         | Pest            | `pestphp/pest`                      |
| **Deploy**          | Docker Compose  | `Dockerfile` + `docker-compose.yml` |

**Project structure**: Laravel domain-driven layout:

```
app/
  Http/Controllers/    — HTTP request handling
  Http/Requests/       — Form Request validation
  Http/Resources/      — API response formatting
  Http/Middleware/      — Custom middleware
  Models/              — Eloquent models
  Services/            — Business logic
  Actions/             — Single-purpose action classes
  DTOs/                — Data Transfer Objects
  Exceptions/          — Custom exceptions
  Enums/               — PHP 8.1+ enums
  Observers/           — Model observers
  Policies/            — Authorization policies
config/                — Configuration files
database/migrations/   — Database migrations
database/factories/    — Model factories
database/seeders/      — Database seeders
routes/api.php         — API routes
routes/web.php         — Web routes
tests/Unit/            — Unit tests
tests/Feature/         — Feature/integration tests
```

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

### 6. Always Generate Docker Files

Every project MUST include these files:

**Dockerfile** (multi-stage build):

```dockerfile
FROM php:8.3-fpm-alpine AS base
RUN apk add --no-cache libpng-dev libjpeg-turbo-dev freetype-dev libzip-dev icu-dev oniguruma-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql gd zip intl mbstring opcache bcmath pcntl

FROM base AS composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-scripts

FROM base AS production
WORKDIR /app
COPY --from=composer /app/vendor ./vendor
COPY . .
RUN php artisan config:cache && php artisan route:cache && php artisan view:cache
RUN chown -R www-data:www-data storage bootstrap/cache
EXPOSE 9000
CMD ["php-fpm"]
```

**docker-compose.yml** (App + MySQL + Redis + Nginx):

```yaml
services:
  app:
    build: .
    volumes:
      - .:/app
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started

  nginx:
    image: nginx:alpine
    ports:
      - "8080:80"
    volumes:
      - ./docker/nginx.conf:/etc/nginx/conf.d/default.conf
      - .:/app
    depends_on:
      - app

  db:
    image: mysql:8.0
    ports:
      - "3306:3306"
    environment:
      MYSQL_DATABASE: appdb
      MYSQL_ROOT_PASSWORD: secret
    volumes:
      - dbdata:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  dbdata:
```

**Makefile** (must include):

```makefile
dev:
	php artisan serve
test:
	./vendor/bin/pest --parallel
lint:
	./vendor/bin/phpstan analyse --memory-limit=512M
format:
	./vendor/bin/pint
check: format lint test
migrate:
	php artisan migrate
docker-up:
	docker-compose up -d --build
docker-down:
	docker-compose down
```

## Pre-Delivery Checklist

Before delivering PHP code, verify:

- [ ] `./vendor/bin/phpstan analyse` passes (level 6+)
- [ ] `./vendor/bin/pint --test` passes
- [ ] `./vendor/bin/pest` or `./vendor/bin/phpunit` passes
- [ ] `declare(strict_types=1)` in every PHP file
- [ ] All user input validated (Form Requests)
- [ ] No `$request->all()` in create/update calls
- [ ] CSRF protection enabled for web routes
- [ ] Mass assignment protected ($fillable defined)
- [ ] N+1 queries prevented (eager loading, preventLazyLoading)
- [ ] Sensitive data not logged or exposed
- [ ] Passwords hashed with bcrypt/Argon2
- [ ] APP_DEBUG=false in production config
- [ ] API responses use Resources (not raw models)
- [ ] Database operations wrapped in transactions
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

## Resources

- **scripts/**: BM25 search engine, architecture system generator
- **data/**: 21 CSV databases with 300+ curated PHP entries
- **Resources**: PHP best practices across 12 domains and 8 stacks
