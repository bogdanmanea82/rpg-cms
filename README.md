# RPG Content Management System

## Project Vision
A TypeScript-based content management system for RPG games, built using atomic design principles with a "write once, share everywhere" architecture.

## Development Philosophy
This project serves as both a functional application and a learning laboratory for systems-level software development. Every component is designed atomically, extensively documented, and built with a deep understanding of trade-offs.

## Architecture Overview
- **Atomic Design**: Components decomposed into atoms (<50 lines), molecules (2-4 atoms), and organisms (2-4 molecules)
- **Universal System**: CRUD operations written once, reused via configuration
- **Entity-Driven**: Game Domains, Categories, Mechanics, Actions configured not coded

## Technology Stack
- **Runtime**: Node.js 20 LTS
- **Language**: TypeScript (strict mode)
- **Database**: PostgreSQL (with SQLite for testing)
- **Containerization**: Docker + Docker Compose
- **Testing**: Jest
- **Development**: WSL2 Ubuntu + VSCode

## Current Status
🚧 **Phase 1: Foundation & Environment Setup** (In Progress)

Currently establishing development environment and building first entities with atomic CRUD operations.

## Documentation
- Architecture decisions: `/docs/architecture/`
- Learning logs: Tracked in separate Obsidian vault
- Setup guides: See `/docs/setup/`

## Project Structure
```
rpg-cms/
├── src/              # TypeScript source code
├── config/           # Configuration files
├── docs/             # Architecture and setup documentation
├── scripts/          # Helper scripts
└── tests/            # Test suites
```

## Learning Goals
1. Master TypeScript syntax through manual implementation
2. Understand systems architecture at application and infrastructure levels
3. Develop diagnostic thinking for complex system debugging
4. Build portfolio demonstrating systems-level capabilities

---

**Status**: Early development | **Phase**: 1 | **Last Updated**: 2025-11-19
