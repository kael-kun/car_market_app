# Deployment

## Platform: Cloudflare Workers

Per constitution and user decision — NOT Cloudflare Pages. Uses `@astrojs/cloudflare` adapter v13+ for Astro 6+.

## Prerequisites

- Node.js 22+ (Astro 6 drops Node 18/20 support)
- Wrangler CLI v4+ (`npm install wrangler@latest --save-dev`)
- Cloudflare account with Workers & R2 access
- Supabase project with Postgres database

## Astro Configuration (astro.config.mjs)

```javascript
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',   // SSR mode — use 'static' for fully static, or mix with prerender per-page
  adapter: cloudflare({
    // imageService: 'passthrough' if using Astro's Image component
  }),
});
```

## Wrangler Configuration (wrangler.jsonc)

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "main": "@astrojs/cloudflare/entrypoints/server",
  "name": "car-marketplace",
  "compatibility_date": "2026-04-29",
  "compatibility_flags": ["nodejs_compat"],
  
  "assets": {
    "directory": "./dist",
    "binding": "ASSETS"
  },
  
  "preview_urls": false,
  "workers_dev": true,
  
  "observability": {
    "enabled": true,
    "head_sampling_rate": 1
  },
  
  "r2_buckets": [
    {
      "binding": "CAR_IMAGES",
      "bucket_name": "car-marketplace-images",
      "remote": true
    }
  ],
  
  "vars": {
    "SUPABASE_URL": "https://your-project.supabase.co",
    "SUPABASE_ANON_KEY": "your-anon-key"
  },
  
  "env": {
    "production": {
      "name": "car-marketplace",
      "vars": {
        "SUPABASE_URL": "https://your-project.supabase.co",
        "SUPABASE_ANON_KEY": "your-anon-key"
      },
      "r2_buckets": [
        {
          "binding": "CAR_IMAGES",
          "bucket_name": "car-marketplace-images-prod",
          "remote": true
        }
      ]
    },
    "development": {
      "name": "car-marketplace-dev",
      "vars": {
        "SUPABASE_URL": "https://your-dev-project.supabase.co",
        "SUPABASE_ANON_KEY": "your-dev-anon-key"
      },
      "r2_buckets": [
        {
          "binding": "CAR_IMAGES",
          "bucket_name": "car-marketplace-images-dev",
          "remote": true
        }
      ]
    }
  }
}
```

## Secrets Management

Set secrets via Wrangler CLI (stored securely, not in `wrangler.jsonc`):

```bash
# Supabase credentials
npx wrangler secret put SUPABASE_URL
npx wrangler secret put SUPABASE_ANON_KEY
npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY

# R2 credentials (if not using bindings)
npx wrangler secret put R2_ACCOUNT_ID
npx wrangler secret put R2_BUCKET_NAME
```

## Build & Deploy Commands

### Local Development

```bash
# Uses workerd runtime (real Cloudflare runtime, not Node.js simulation)
npx astro dev

# Preview production build locally
npx astro build && npx wrangler dev
```

### Production Deploy

```bash
# Build and deploy to Cloudflare Workers
npx astro build && npx wrangler deploy

# Deploy to specific environment
npx wrangler deploy --env=production
npx wrangler deploy --env=development
```

### Prisma Migrations (Manual Step)

```bash
# Connect to Supabase Postgres and run migrations
npx prisma migrate deploy
# OR for development
npx prisma migrate dev --name init
```

**Note**: Prisma migrations run against Supabase Postgres directly (not through Cloudflare Workers). Set `DATABASE_URL` as environment variable when running migrations locally.

## CI/CD (Cloudflare Workers Builds)

1. Log in to Cloudflare Dashboard → Compute → Workers & Pages → Create Application
2. Select "Import a repository" (connect GitHub)
3. Configure project:
   - **Build command**: `npx astro build`
   - **Deploy command**: `npx wrangler deploy`
4. Add secrets in Cloudflare Dashboard → Settings → Variables and Secrets
5. Push to `main` branch triggers automatic build + deploy

## Post-Deployment

- **Worker URL**: `https://car-marketplace.your-subdomain.workers.dev`
- **Custom Domain**: Configure in Cloudflare Dashboard → Workers → Settings → Domains
- **Observability**: View logs in Cloudflare Dashboard → Workers → Logs (enabled via `observability: true`)

## Rollback Strategy

```bash
# List recent deployments
npx wrangler deployments list

# Rollback to previous version
npx wrangler rollback
```