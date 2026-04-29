# Architecture

## Pattern: Feature-Based Module Architecture

Per constitution and .opencode/context/setup/astro-cloudflare-worker-setup/references/ddd-architecture.md, the codebase uses feature-based modules aligned to PRD features.

## Database Layer (Prisma + Supabase Postgres)

- **Prisma**: Migrations ONLY via CLI (`npx prisma migrate dev`, `npx prisma db push`). Prisma Client is NOT used at runtime to avoid Cloudflare Workers edge compatibility issues.
- **Supabase JS Client**: ALL runtime database queries (listings, users, messages, favorites) executed via Supabase Postgres connection. Schema defined in `prisma/schema.prisma` but queried via Supabase client.

## Authentication Layer

- **Supabase JS Client** exclusively for auth (per constitution).
- Authorization Code Flow with PKCE (per .opencode/context/security/auth-protocol.md).
- Session management via Supabase JWT (short-lived access + refresh token rotation).

## Storage Layer

- **Cloudflare R2** for all object storage (car listing images, user avatars).
- Accessed via Cloudflare Worker bindings (`env.CAR_IMAGES.put()`) or presigned URLs for direct browser uploads.
- R2 buckets are private; public access via Cloudflare Workers or presigned URLs only.

## Application Layer

```
Request → Astro Page/Action → Supabase JS Client → Supabase Postgres
                                      ↓
                              Cloudflare R2 (for image uploads)
```

- **Astro Actions**: Server-side logic (create listing, send message, search listings) using `astro:actions`.
- **Astro Pages**: SSR pages (`output: 'server'`) with `prerender: true` for static pages (privacy policy, about).
- **Feature Modules**: Each feature contains its own components, actions, Supabase queries, types, and tests.

## Real-Time & Messaging

- Supabase Realtime (via Supabase JS Client) for buyer-seller messaging (post-MVP).
- WebSockets via Cloudflare Durable Objects for advanced realtime features (future).

## Post-MVP / Future Architecture

- Admin moderation dashboard (feature module: `src/features/admin/`)
- Favorites and comparison tools (feature modules: `src/features/favorites/`, `src/features/compare/`)
- Dealer subscriptions (Stripe integration via Astro Actions)
- AI price suggestions (Cloudflare Workers AI binding)