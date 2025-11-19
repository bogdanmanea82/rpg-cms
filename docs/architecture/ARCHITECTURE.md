# RPG CMS Architecture

## Core Principles

### 1. Atomic Design
Every component follows strict size limits:
- **Atoms**: ≤50 lines (single responsibility)
- **Molecules**: 2-4 atoms coordinated
- **Organisms**: 2-4 molecules orchestrated

### 2. Write Once, Share Everywhere
Universal CRUD atoms implemented once, then configured per entity. No duplication.

### 3. Configuration Over Code
Entity behavior defined in JSON configuration files, not hardcoded logic.

## Architecture Layers
```
┌─────────────────────────────────────┐
│ API Layer (Express Routes)          │
│ - Route registration from config    │
└─────────────────────────────────────┘
            ↕
┌─────────────────────────────────────┐
│ Organism Layer                       │
│ - Entity-specific coordination      │
└─────────────────────────────────────┘
            ↕
┌─────────────────────────────────────┐
│ Molecule Layer                       │
│ - CRUD coordination                 │
│ - Transaction management            │
└─────────────────────────────────────┘
            ↕
┌─────────────────────────────────────┐
│ Atom Layer                          │
│ - Validation, sanitization          │
│ - Database operations               │
│ - Error handling                    │
└─────────────────────────────────────┘
            ↕
┌─────────────────────────────────────┐
│ Universal System                     │
│ - Type-safe query builders          │
│ - Configuration loader              │
└─────────────────────────────────────┘
```

## Decision Records
- [ADR-001] Atomic Design Adoption
- [ADR-002] TypeScript Strict Mode
- [ADR-003] Configuration-Driven Entities

(Architecture Decision Records to be created as decisions are made)
