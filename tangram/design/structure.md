# File Structure

## Feature-Based Module Architecture

Per constitution and `.opencode/context/setup/astro-cloudflare-worker-setup/references/ddd-architecture.md`.

## Directory Tree

```
car_market_app/
├── public/                        # Static assets (favicon, robots.txt)
│
├── src/
│   ├── features/                  # Feature modules (core architecture)
│   │   ├── auth/                  # Authentication (Supabase JS Client)
│   │   │   ├── components/        # LoginForm.astro, RegisterForm.astro
│   │   │   ├── actions.ts         # Astro Actions (login, register, logout)
│   │   │   ├── queries.ts         # Supabase auth & user queries
│   │   │   ├── types.ts           # Auth-related TypeScript types
│   │   │   └── __tests__/         # Vitest unit tests
│   │   │
│   │   ├── listings/              # Car listings (MVP core)
│   │   │   ├── components/        # ListingCard.astro, ListingForm.astro, SearchFilters.astro
│   │   │   ├── pages/             # listing/[id].astro, create.astro, browse.astro
│   │   │   ├── actions.ts         # Astro Actions (create, update, delete listing)
│   │   │   ├── queries.ts         # Supabase queries (search, filter, CRUD)
│   │   │   ├── types.ts           # Listing types, filter types
│   │   │   └── __tests__/
│   │   │
│   │   ├── messaging/             # Buyer-seller messaging (MVP)
│   │   │   ├── components/        # MessageThread.astro, MessageInput.astro
│   │   │   ├── actions.ts         # Astro Actions (send message)
│   │   │   ├── queries.ts         # Supabase Realtime queries
│   │   │   └── __tests__/
│   │   │
│   │   ├── favorites/             # Saved listings (post-MVP)
│   │   ├── compare/               # Vehicle comparison (post-MVP)
│   │   ├── admin/                 # Admin moderation dashboard (post-MVP)
│   │   │
│   │   └── shared/               # Cross-feature utilities
│   │       ├── supabase.ts        # Supabase client initialization
│   │       ├── r2.ts              # Cloudflare R2 helper functions
│   │       ├── types.ts           # Shared types (User, Listing, Message)
│   │       └── utils.ts           # Formatting, validation helpers
│   │
│   ├── cloudflare/               # Cloudflare-specific code
│   │   └── worker.ts              # Custom Worker entry point (R2 bindings)
│   │
│   ├── layouts/                  # Astro layouts
│   │   ├── BaseLayout.astro       # Meta-inspired sticky nav, frosted glass
│   │   └── AuthLayout.astro       # Layout for login/register pages
│   │
│   ├── pages/                     # Top-level pages (non-feature)
│   │   ├── index.astro            # Homepage (Meta-inspired hero)
│   │   ├── about.astro            # Static page (prerender: true)
│   │   └── privacy-policy.astro   # Static page (prerender: true)
│   │
│   ├── middleware.ts              # Astro middleware (auth checks, redirects)
│   │
│   └── env.d.ts                  # Cloudflare Workers type declarations
│
├── prisma/
│   └── schema.prisma              # Database schema (migrations ONLY, no runtime client)
│
├── public/
│   ├── _headers                   # Custom headers for static assets
│   └── _redirects                 # Redirects for static assets
│
├── tangram/                       # Tangram Build documentation
│   ├── overview.md
│   ├── constitution.md
│   ├── studies/
│   └── design/
│
├── wrangler.jsonc                 # Cloudflare Workers configuration
├── astro.config.mjs               # Astro configuration (@astrojs/cloudflare adapter)
├── tailwind.config.ts             # Tailwind configured with design-ui.md tokens
├── tsconfig.json                  # TypeScript configuration
├── package.json
└── .env.local                     # Supabase URL/Anon Key, R2 bindings (gitignored)
```

## Key Structural Rules

1. **Feature modules own everything**: Each feature directory contains its own components, actions, queries, types, and tests.
2. **Shared code only in `features/shared/`**: No cross-feature imports except through shared utilities.
3. **Prisma schema lives in `prisma/`**: Used for migrations only (`npx prisma migrate dev`).
4. **Supabase client initialized in `features/shared/supabase.ts`**: Single initialization point, imported by all feature query files.
5. **No Prisma Client imports in feature code**: All runtime queries use Supabase JS Client.
6. **Astro Actions per feature**: Server-side logic co-located with the feature it serves.
7. **Tests co-located**: `__tests__/` directory inside each feature module.

## Static vs SSR Pages

- **SSR (default)**: `output: 'server'` in astro.config.mjs — all feature pages (listings, auth, messaging)
- **Static (opt-in)**: `export const prerender = true` — about.astro, privacy-policy.astro, index.astro (if no dynamic content needed)