# Omni Common Site — Project Handoff

**Live site:** https://omnicommon.com  
**Staging/preview:** https://omnicommon.netlify.app  
**GitHub repo:** https://github.com/rodrigoomni/omni-common  
**Last updated:** 2026-08-20

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 15 (App Router, `output: 'export'` — static) |
| Styling | Tailwind CSS |
| Animation | GSAP, Framer Motion, Lenis (smooth scroll) |
| 3D | React Three Fiber / Three.js |
| Hosting | Netlify (auto-deploy on push to `master`) |
| Node | 20 (pinned in `netlify.toml`) |
| CMS | Decap CMS at `/admin/` (Netlify Identity + Git Gateway) |

---

## Repo & Deploy

```
GitHub: rodrigoomni/omni-common (branch: master)
         ↓ push to master
Netlify auto-build (npm run build → out/)
         ↓
omnicommon.com
```

- Every push to `master` triggers a Netlify build automatically.
- Build command: `npm run build`
- Publish directory: `out`
- No manual deploys needed — just push.

---

## Local Development

```bash
git clone https://github.com/rodrigoomni/omni-common.git
cd omni-common
npm install
cp .env.local.example .env.local   # or ask Rodrigo for .env.local
npm run dev
```

Open http://localhost:3000.

### Required env vars

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_GA_ID` | GA4 Measurement ID (`G-1HHFHC4DRP`) |

Set these in `.env.local` for local dev, and in Netlify → Site settings → Environment variables for production.

---

## Site Pages

| Route | File |
|-------|------|
| `/` | `src/app/page.tsx` |
| `/about` | `src/app/about/page.tsx` |
| `/about/team` | `src/app/about/team/page.tsx` |
| `/work` | `src/app/work/page.tsx` |
| `/work/[slug]` | `src/app/work/[slug]/page.tsx` |
| `/insights/local-marketing` | `src/app/insights/local-marketing/page.tsx` |

404 is handled by `src/app/not-found.tsx`.

---

## Analytics

### Google Analytics 4
- Measurement ID: `G-1HHFHC4DRP`
- Component: `src/components/google-analytics.tsx`
- Fires a manual `page_view` event on every App Router navigation (required for SPA-style routing with static export).

### ChatGPT Ads Pixel (OpenAI oaiq)
- Pixel ID: `G4ADXr6fGCLsSVXXuhbwYc`
- Component: `src/components/chatgpt-pixel.tsx`
- Tracks conversions from ChatGPT ad campaigns.

Both are mounted in `src/app/layout.tsx` and load `afterInteractive` (non-blocking).

---

## Contact Form (Footer)

- Platform: Netlify Forms
- Form name: `contact`
- Form ID: `6a821cbe9d513300082593d2`
- Submits via JS fetch (URL-encoded) — no page reload.
- Honeypot field: `bot-field` (spam protection).
- On success: fires GA4 `generate_lead` event.
- Static detection file: `public/__forms.html` (required for static export builds).

**Email notifications** fire on every submission to:
| Recipient | Hook ID |
|-----------|---------|
| ryan@omnicommon.com | `6a821d42b436ad40399d0bcc` |
| daniel@omnicommon.com | `6a821d49563075d246f6ffda` |
| rodrigo@omnicommon.com | `6a821d4b32cefe7ecade8f36` |
| contact@omnicommon.com | `6a821d4c4bbcc36044068545` |

Notification settings: Netlify → Forms → contact → Form notifications.

---

## CMS — Decap CMS

- URL: https://omnicommon.com/admin/
- Login: Netlify Identity (email auth, invite-only)
- Backend: Git Gateway → commits directly to `master` → triggers Netlify rebuild.
- Config: `public/admin/config.yml`
- Admin shell: `public/admin/index.html`

**CMS-editable content files:**

| Page | JSON file |
|------|-----------|
| Home | `src/content/home.json` |
| About | `src/content/about.json` |
| Contact | `src/content/contact.json` |
| Nav + Footer | `src/content/global.json` |

To invite a new CMS editor: Netlify → Identity → Invite users.

---

## Netlify Config

File: `netlify.toml`

- Security headers (CSP, HSTS, X-Frame-Options, etc.) applied to all routes.
- Long-term caching headers for `/_next/static/*`, `/images/*`, `/*.svg`.
- Redirects: `/local-marketing` and `/local` → `/insights/local-marketing/`.
- CSP allows: Google Tag Manager, Google Analytics, Netlify Identity, OpenAI Ads CDN (`bzrcdn.openai.com`).

---

## Key Contacts

| Person | Role | Email |
|--------|------|-------|
| Rodrigo | Dev / Owner | rodrigo@omnicommon.com |
| Daniel | Editor | daniel@omnicommon.com |
| Ryan | Editor | ryan@omnicommon.com |

**Netlify account:** rodrigo@omnicommon.com  
**GitHub org:** rodrigoomni  

---

## Current Status

- [x] All pages built and live
- [x] GA4 tracking active (`G-1HHFHC4DRP`)
- [x] ChatGPT Ads pixel active
- [x] Footer contact form with email notifications
- [x] Decap CMS live at `/admin/`
- [ ] Remaining pages wired to CMS JSON (about/team, work, insights pages)
