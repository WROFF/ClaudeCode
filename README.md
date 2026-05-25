# Google Login Demo

A minimal **Next.js (App Router)** web app with **Sign in with Google**, built on
[Auth.js v5](https://authjs.dev). Sessions are stored in an encrypted, httpOnly
cookie (the JWT strategy) — server-validated on every request, no database required.

## What's in here

| Path | Purpose |
| --- | --- |
| `auth.ts` | Auth.js config: Google provider, cookie/JWT sessions, route protection rule |
| `middleware.ts` | Protects `/dashboard/*`, redirecting signed-out users to Google |
| `app/api/auth/[...nextauth]/route.ts` | OAuth callback + session endpoints |
| `app/page.tsx` | Home page — shows sign-in button or the current user |
| `app/dashboard/page.tsx` | Example protected page |
| `components/auth-buttons.tsx` | `SignIn` / `SignOut` (Server Actions) |

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create Google OAuth credentials

1. Go to the [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials).
2. Create an **OAuth 2.0 Client ID**, application type **Web application**.
3. Add an authorized redirect URI:
   - Dev: `http://localhost:3000/api/auth/callback/google`
   - Prod: `https://YOUR_DOMAIN/api/auth/callback/google`
4. Copy the **Client ID** and **Client Secret**.

### 3. Configure environment

```bash
cp .env.example .env.local
npx auth secret   # generates AUTH_SECRET and writes it for you
```

Then fill in `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` in `.env.local`.

### 4. Run

```bash
npm run dev
```

Open http://localhost:3000 and click **Sign in with Google**.

## How auth works here

- Clicking **Sign in** triggers a Server Action that starts Google's OAuth flow.
- On success, Auth.js sets an encrypted session cookie and redirects to `/dashboard`.
- `middleware.ts` guards `/dashboard/*`; the `authorized` callback in `auth.ts`
  decides who gets through.
- `await auth()` reads the session in any Server Component (see `app/page.tsx`).

## Going further

- Persist users / link accounts: add a [database adapter](https://authjs.dev/getting-started/database)
  and switch `session.strategy` to `"database"`.
- Add more providers (GitHub, email, etc.) in the `providers` array of `auth.ts`.
