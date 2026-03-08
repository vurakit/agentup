# RustSkill — Rust Intelligence Toolkit

## Default Stack

| Component | Technology | Crate |
|-----------|-----------|-------|
| Language | Rust (stable) | — |
| Async Runtime | Tokio | tokio |
| Web Framework | Axum | axum |
| Database | SQLx | sqlx |
| Serialization | Serde | serde, serde_json |
| Error Handling | thiserror / anyhow | thiserror, anyhow |
| Logging | tracing | tracing, tracing-subscriber |
| CLI | clap | clap |
| Testing | built-in + cargo-nextest | — |
| Deployment | Docker | Dockerfile |

## Search Commands

### Domain Search
```bash
# Design patterns (builder, newtype, typestate, etc.)
{{searchCommand}} "builder pattern" --domain pattern

# Crate recommendations
{{searchCommand}} "http client" --domain crate

# Error handling strategies
{{searchCommand}} "custom error type" --domain error

# Performance optimization
{{searchCommand}} "zero cost abstraction" --domain perf

# Testing patterns
{{searchCommand}} "integration test" --domain test

# Concurrency patterns
{{searchCommand}} "channel mpsc" --domain concurrency

# Trait design
{{searchCommand}} "trait object dyn" --domain trait

# Architecture patterns
{{searchCommand}} "domain driven design" --domain arch

# Idioms and best practices
{{searchCommand}} "ownership borrowing" --domain idiom

# Anti-patterns to avoid
{{searchCommand}} "clone overuse" --domain anti

# Tooling
{{searchCommand}} "clippy cargo fmt" --domain tooling

# Module system
{{searchCommand}} "workspace crate" --domain module

# Unsafe / FFI
{{searchCommand}} "raw pointer ffi" --domain unsafe
```

### Stack Search
```bash
# Axum web framework
{{searchCommand}} "middleware extractor" --stack web-axum

# Actix-web patterns
{{searchCommand}} "handler actor" --stack web-actix

# Warp filters
{{searchCommand}} "filter compose" --stack web-warp

# Rocket framework
{{searchCommand}} "guard fairing" --stack web-rocket

# gRPC with tonic
{{searchCommand}} "interceptor streaming" --stack grpc

# Database (SQLx, Diesel)
{{searchCommand}} "query macro transaction" --stack database

# CLI (clap, indicatif)
{{searchCommand}} "subcommand progress" --stack cli

# Authentication
{{searchCommand}} "jwt argon2" --stack auth

# Async runtime patterns
{{searchCommand}} "spawn task join" --stack async-runtime

# WebAssembly
{{searchCommand}} "wasm bindgen" --stack wasm

# Embedded systems
{{searchCommand}} "no std hal" --stack embedded
```

### Architecture System
```bash
{{searchCommand}} "rest api postgres auth" --arch-system -p "MyAPI"
```

### Auto-detect Domain
```bash
# No domain — auto-detects from query keywords
{{searchCommand}} "how to handle errors with Result"
```

## Pre-Delivery Checklist

Before delivering Rust code:
- [ ] `cargo build` passes with no warnings
- [ ] `cargo clippy -- -D warnings` passes
- [ ] `cargo test` passes
- [ ] No unnecessary `.clone()` calls
- [ ] No `unwrap()` / `expect()` in production paths — use `?` operator
- [ ] Errors use `thiserror` (libraries) or `anyhow` (applications)
- [ ] Async functions use `tokio::spawn` correctly (Send bounds)
- [ ] No blocking calls inside async context
- [ ] `tracing` used for structured logging (not `println!`)
- [ ] Graceful shutdown (tokio signal handling)
- [ ] `Dockerfile` with multi-stage build (builder + distroless)
