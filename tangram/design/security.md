# Security Blueprint

## Protocol: OAuth 2.0 & Identity Security Protocol (.opencode/context/security/auth-protocol.md)

## 1. Authentication Architecture

- **Grant Type**: Authorization Code Flow with PKCE (Proof Key for Code Exchange)
- **Identity Provider**: Supabase Auth (managed)
- **Session Strategy**: JWT (short-lived access tokens 1hr) + Refresh Token Rotation
- **Client**: Supabase JS Client exclusively (per constitution)

### PKCE Implementation (Mandatory)

Every authentication request MUST include:
- **Code Challenge & Verifier**: Prevents authorization code interception
- **State & Nonce**: CSRF protection and replay-attack prevention

### Social Login Providers

- Email/Password (Supabase Auth)
- Google OAuth (configure in Supabase dashboard)
- Apple OAuth (configure in Supabase dashboard)

## 2. Authorization Matrix (RBAC)

| Role | Scopes | Access Level | Supabase RLS Policies |
|------|--------|--------------|----------------------|
| **Buyer** | `read:listings`, `create:inquiries`, `create:favorites` | Browse listings, contact sellers, save favorites | Can READ all listings, CREATE own inquiries/favorites |
| **Seller** | `read:own`, `write:own`, `delete:own` | CRUD own listings, respond to inquiries | Can CRUD OWN listings (user_id match), READ/WRITE own inquiries |
| **Admin** | `read:all`, `write:all`, `delete:all`, `moderate:all` | Full system access, user management, moderation | Bypass RLS for moderation (service role key in Worker) |

### Row Level Security (RLS)

- ALL Supabase tables MUST have RLS enabled
- Policies defined per table matching the RBAC matrix above
- Supabase JS Client automatically sends JWT; RLS policies validate against `auth.uid()`

## 3. Data Protection

### Transport Layer

- **TLS 1.3+** enforced on all connections (Cloudflare Workers handles this automatically)
- **HTTPS Only**: All Supabase and Cloudflare R2 connections over HTTPS

### Storage Layer

- **PII Encrypted at Rest**: Supabase Postgres encrypts data at rest
- **R2 Buckets Private**: Car listing images stored in private Cloudflare R2 buckets
- **Presigned URLs**: Time-limited (1hr) URLs for image access, no permanent public links

### Secrets Management

| Secret | Storage | Access |
|--------|---------|--------|
| `SUPABASE_URL` | Cloudflare Secrets (`wrangler secret put`) | Worker runtime only |
| `SUPABASE_ANON_KEY` | Cloudflare Secrets | Worker runtime only |
| `SUPABASE_SERVICE_ROLE_KEY` | Cloudflare Secrets (Admin only) | Worker runtime only, NEVER client-side |
| `R2_BUCKET_NAME` | `wrangler.jsonc` vars | Worker runtime via binding |
| `R2_ACCOUNT_ID` | Cloudflare Secrets | Worker runtime only |

**NEVER** commit secrets to code or `.env.local` (add to `.gitignore`).

## 4. API & Data Protection

### CORS Policy

- Strict origin allowlist (configure in Supabase Auth URL settings)
- No wildcard (`*`) allowed in production

### Payload Security

- Input validation on all Astro Actions (Zod schemas recommended)
- Supabase JS Client parameterizes all queries (SQL injection protection)
- File upload validation: allowed types (`image/jpeg`, `image/png`, `image/webp`, `image/avif`), max 5MB per file

### Rate Limiting

- Supabase Auth: Built-in rate limiting on auth endpoints
- Cloudflare Workers: Configure rate limiting via Cloudflare dashboard for custom endpoints
- Messaging endpoints: Max 10 messages/hour per user (prevent spam)

## 5. Security Headers (Cloudflare Workers)

Configure in `public/_headers` or via Worker response:

```
Content-Security-Policy: default-src 'self'; img-src 'self' *.r2.dev; script-src 'self' 'unsafe-inline'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

## 6. Security Hardening Checklist

- [ ] **PKCE Enabled** (Mandatory for Supabase Auth)
- [ ] **Refresh Token Rotation** (Enabled in Supabase Auth settings)
- [ ] **HSTS & Secure Headers** (CSP, X-Frame-Options via `_headers`)
- [ ] **Rate Limiting** (Configured for auth and messaging endpoints)
- [ ] **RLS Enabled** (All Supabase tables)
- [ ] **R2 Buckets Private** (No public access, presigned URLs only)
- [ ] **Secrets in Cloudflare** (No secrets in code or `.env.local`)
- [ ] **Input Validation** (Zod schemas on all Astro Actions)
- [ ] **Error Handling** (Generic user errors, detailed server-side logs per constitution)