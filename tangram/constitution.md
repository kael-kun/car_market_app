# Project Constitution

**Version:** 1.0
**Last Updated:** 2026-04-29

## Changelog
- **v1.0:** Initial constitution establishing technology stack rules, design-ui.md adherence, feature-based architecture, Tailwind CSS styling, Vitest testing, and centralized error handling standards.

## Core Principles

### 1. Mandatory Technology Stack
> **Rationale:** Enforces consistency with the approved project stack to avoid compatibility issues, especially for Cloudflare Workers deployment and Supabase/Prisma integration.
**Enforcement Rule:** MUST use AstroJS with TypeScript and Astro Actions for all server-side logic. MUST use Supabase JS Client exclusively for authentication and ALL runtime database queries. MUST use Prisma CLI for database migrations ONLY (no Prisma Client at runtime). MUST use Cloudflare R2 for object storage. MUST deploy to Cloudflare Workers. NEVER use alternative auth providers, ORMs, storage solutions, or deployment targets without explicit user approval.

### 2. Design System Compliance
> **Rationale:** Maintains a cohesive Meta-inspired visual identity per design-ui.md to ensure consistent user experience across all pages and components.
**Enforcement Rule:** ALL styling MUST use Tailwind CSS configured to match design-ui.md tokens (Meta Blue #0064E0, Optimistic VF typography, 8px spacing grid, pill button radii, card shadows). NEVER use inline styles, raw CSS files, or Tailwind classes that conflict with design-ui.md specifications. MUST reference design-ui.md hex codes and typography rules when implementing components.

### 3. Feature-Based Module Architecture
> **Rationale:** Aligns codebase structure with PRD feature sets (listings, auth, messaging, admin) for scalability and easy maintenance.
**Enforcement Rule:** MUST group all code (Astro components, Astro Actions, Prisma schemas, Supabase queries, types, tests) by feature in /src/features/ (e.g., /src/features/listings, /src/features/auth). NEVER mix cross-feature code in shared directories unless explicitly utility/helper code with no feature-specific logic.

### 4. Vitest Unit Testing
> **Rationale:** Ensures reliability of critical business logic including auth, listing management, and search functionality.
**Enforcement Rule:** MUST use Vitest for unit tests covering all Astro Actions, Supabase query utilities, and shared helper functions. MUST maintain minimum 80% code coverage for all feature modules. NEVER commit untested Astro Actions or database interaction functions.

### 5. Centralized Error Handling
> **Rationale:** Prevents exposure of internal system details to end users and ensures consistent error management across the stack.
**Enforcement Rule:** MUST use Astro error boundaries for UI errors, centralized error catching for all Astro Actions, Supabase auth calls, and R2 operations. NEVER expose internal errors (Prisma migration errors, Supabase keys, R2 credentials, stack traces) to end users. MUST return generic user-friendly error messages and log detailed errors server-side via Cloudflare Workers native logging.