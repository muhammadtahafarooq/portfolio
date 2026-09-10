# Cloudflare Pages Deployment Guide

> Step-by-step guide to deploy Muhammad Taha's portfolio on Cloudflare Pages.

---

## Prerequisites

- GitHub account (code is already pushed)
- Cloudflare account (free tier, no card required)
- Turso database (free tier)

---

## Step 1: Create Cloudflare Account

1. Go to [cloudflare.com](https://cloudflare.com) → Sign up (free)
2. No credit card required

---

## Step 2: Connect GitHub to Cloudflare

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages**
2. **Connect to Git** → Authorize GitHub
3. Select your repo: `muhammadtahafarooq/protfolio` (or whatever the repo name is)
4. Configure:
   - **Production branch:** `main`
   - **Build command:** `npx @cloudflare/next-on-pages`
   - **Build output directory:** `.vercel/output/static`
   - **Node.js version:** `18` (in environment variables)
5. Click **Save and Deploy**

---

## Step 3: Set Environment Variables

In Cloudflare dashboard → Workers & Pages → your project → **Settings** → **Environment variables** → **Add variable**:

### Required Variables

| Variable | Value | Notes |
|----------|-------|-------|
| `TURSO_DATABASE_URL` | `libsql://your-db-name.turso.io` | From Turso dashboard |
| `TURSO_AUTH_TOKEN` | `your-turso-auth-token` | From Turso dashboard |
| `NEXTAUTH_SECRET` | `your-random-secret-32-chars` | Generate with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `https://your-project.pages.dev` | Your live URL |
| `ADMIN_EMAIL` | `your-email@gmail.com` | Admin login email |
| `ADMIN_PASSWORD` | (leave empty — set via seed script or admin panel) | Hashed with bcrypt |
| `RESEND_API_KEY` | `re_your_resend_api_key` | From resend.com |
| `CONTACT_EMAIL` | `muhammadtahafarooq22@gmail.com` | Where contact emails go |
| `CLOUDFLARE_ACCOUNT_ID` | `your_cloudflare_account_id` | From R2 dashboard |
| `R2_ACCESS_KEY_ID` | `your_r2_access_key` | From R2 → Manage R2 API Tokens |
| `R2_SECRET_ACCESS_KEY` | `your_r2_secret_key` | From R2 → Manage R2 API Tokens |
| `R2_BUCKET_NAME` | `your-bucket-name` | From R2 dashboard |
| `R2_PUBLIC_URL` | `https://your-bucket.your-account-id.r2.dev` | From R2 → Settings → Public Access |
| `GITHUB_TOKEN` | `ghp_your_github_token` | From GitHub → Settings → Developer settings → PAT |
| `GITHUB_USERNAME` | `muhammadtahafarooq` | GitHub username |
| `NEXT_PUBLIC_SITE_URL` | `https://your-project.pages.dev` | Same as NEXTAUTH_URL |

### How to Get Each Value

**Turso Database:**
1. Install Turso CLI: `curl -sSfL https://get.tur.so/install.sh | bash`
2. `turso auth login`
3. `turso db create taha-portfolio`
4. `turso db show taha-portfolio --url` → gives `TURSO_DATABASE_URL`
5. `turso db tokens create taha-portfolio` → gives `TURSO_AUTH_TOKEN`
6. Push schema: `turso db shell taha-portfolio < schema.sql`

**Resend API Key:**
1. Go to [resend.com](https://resend.com) → Sign up (free)
2. Create API key
3. Verify your domain (or use `onboarding@resend.dev` for testing)

**Cloudflare R2:**
1. Cloudflare dashboard → **R2** → **Create bucket**
2. **Manage R2 API Tokens** → Create API token
3. **Settings** → Enable public access for the bucket

**GitHub Token:**
1. GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens
2. Scope: `repo` (full control of private repositories)

---

## Step 4: Create Turso Database Tables

After creating the Turso database, push the schema:

```bash
# Local — generate migration
npm run db:generate

# Push to Turso
TURSO_DATABASE_URL=lib://your-db TURSO_AUTH_TOKEN=your-token npx drizzle-kit push
```

Or manually run the SQL schema (see `schema.sql`).

---

## Step 5: Deploy

### Automatic Deployment
Once connected, every `git push` to `main` triggers automatic deployment.

### Manual Deployment
```bash
npm run pages:build
npx wrangler pages deploy .vercel/output/static
```

### Local Development with Cloudflare
```bash
npm run pages:build
npm run pages:dev
# Opens at http://localhost:8788
```

**Windows limitation:** `@cloudflare/next-on-pages` requires bash/WSL on Windows. Use one of:
- **WSL2:** `wsl --install` then run the build inside WSL
- **Cloudflare dashboard:** Build happens on their Linux servers — no local build needed
- **Docker:** `docker run -it node:18 bash` and run the build inside the container

---

## Step 6: Verify Deployment

1. **Live URL:** Cloudflare dashboard → Workers & Pages → your project → URL shown
2. **Database:** Cloudflare dashboard → D1 (or Turso dashboard)
3. **Images:** Cloudflare dashboard → R2 → your bucket
4. **Deployment history:** Workers & Pages → your project → Deployments tab
5. **Build logs:** GitHub → Actions tab

---

## Troubleshooting

### Build Fails
- Check GitHub Actions tab for error logs
- Ensure `@cloudflare/next-on-pages` is installed: `npm install -D @cloudflare/next-on-pages`
- Ensure Node.js version is set to 18+ in Cloudflare settings

### 500 Errors
- Check Cloudflare Pages → Functions tab for error logs
- Ensure all environment variables are set
- Ensure Turso database is accessible

### Images Not Loading
- Check R2 bucket public access is enabled
- Ensure `R2_PUBLIC_URL` is correct
- Check CSP headers allow `*.r2.cloudflarestorage.com`

### Auth Not Working
- Ensure `NEXTAUTH_SECRET` is set and strong
- Ensure `NEXTAUTH_URL` matches your live URL exactly
- Check that JWT cookies are being set (browser dev tools → Application → Cookies)

### bcrypt Errors on Cloudflare
- `bcryptjs` is pure JavaScript — should work on Cloudflare Pages
- If CPU time limits are hit, consider reducing bcrypt rounds from 12 to 10 in `src/lib/auth/index.ts`

---

## Architecture Summary

| Service | Provider | Free Tier |
|---------|----------|-----------|
| Hosting | Cloudflare Pages | Unlimited requests |
| Database | Turso (libSQL) | 9GB storage, 1B reads/mo |
| Storage | Cloudflare R2 | 10GB storage, 10M reads/mo |
| Email | Resend | 100 emails/day, 3K/mo |
| Auth | NextAuth.js (JWT) | N/A (self-hosted) |
| CDN | Cloudflare | Unlimited |

**Total ongoing cost: $0**
