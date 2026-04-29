# Tech Stack

| Layer | Technology | Version | Role | Notes |
|-------|------------|---------|------|-------|
| **Framework** | AstroJS + TypeScript | Astro 6+ | SSR, on-demand rendering, Astro Actions | `@astrojs/cloudflare` v13+ adapter |
| **Auth & DB Queries** | Supabase JS Client | Latest | Auth (PKCE), ALL runtime Postgres queries, Realtime messaging | NO Prisma Client at runtime |
| **Migrations** | Prisma CLI | Latest | Schema definitions, `prisma migrate` only | `prisma/schema.prisma` defines schema; queries go through Supabase client |
| **Database** | Supabase Postgres | - | Primary relational database | Connected via Supabase JS Client |
| **Storage** | Cloudflare R2 | - | Multi-image uploads for car listings | Private buckets, presigned URLs for client uploads |
| **Styling** | Tailwind CSS | Latest | Mapped to design-ui.md tokens | Meta Blue `#0064E0`, Optimistic VF typography, 8px grid |
| **Testing** | Vitest | Latest | Unit tests for Actions, query helpers | 80% minimum coverage per constitution |
| **Deployment** | Cloudflare Workers | - | SSR hosting, edge runtime (`workerd`) | `wrangler.jsonc` config, `nodejs_compat` flag |
| **Runtime** | `workerd` (Cloudflare) | - | Production and `astro dev` runtime | Astro 6+ uses real workerd in development |

## Key Dependencies (package.json)

```
dependencies:
  "@astrojs/cloudflare": "^13.0.0"
  "astro": "^6.0.0"
  "typescript": "^5.x"
  "@supabase/supabase-js": "^2.x"
  "tailwindcss": "^4.x"
  "@tailwindcss/vite": "latest"

devDependencies:
  "prisma": "^7.x"
  "vitest": "^3.x"
  "wrangler": "^4.x"
```

## Compatibility Flags (wrangler.jsonc)

```jsonc
{
  "compatibility_flags": ["nodejs_compat"],
  "compatibility_date": "2026-04-29"
}
```

## Notes

- **Prisma Client is NOT installed as a runtime dependency** — only Prisma CLI for migrations.
- **Supabase JS Client is the ONLY database query interface** at runtime.
- **Cloudflare R2 replaces Supabase Storage** per user decision for Cloudflare-native deployment.