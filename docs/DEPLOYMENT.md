# Deployment

Where each part of Pixels runs, how it's configured, and what to check when something breaks.

| Part | Service | Address |
|---|---|---|
| Backend API | Render (free tier) | `https://pixels-yquv.onrender.com` (API under `/api`) |
| Website | Netlify, site `pixels10` | `https://pixels.sohailcodes.xyz` (CNAME → `pixels10.netlify.app`) |
| Android app | EAS Build → GitHub Releases | see [RELEASING.md](RELEASING.md) |
| Database, auth, storage | Supabase | project `wfckkvltzcssotvuevly` |

## Backend on Render

- **Root directory:** `backend`
- **Run it** either with the Dockerfile (`backend/Dockerfile`, which runs `uvicorn main:app --host 0.0.0.0 --port ${PORT}`), or as a Python service: build command `pip install -r requirements.txt`, start command `uvicorn main:app --host 0.0.0.0 --port $PORT`.
- **Environment variables:** everything in [Backend variables](#backend-backendenv). Set them in the Render dashboard, never in the repo.
- **Deploying:** push to `main`. If auto-deploy is off, use **Manual Deploy → Deploy latest commit**. Check the deploy log shows the commit you expect.

**Cold starts:** the free tier sleeps after about 15 minutes without traffic, and the first request then takes up to a minute. The app waits up to 60 seconds and shows "Waking up the server…". To avoid it, move to a paid instance, or have an uptime monitor call `/api/explore?limit=1` every 10 minutes.

## Website on Netlify

- **Base directory:** `website` · **Build command:** `npm run build` · Netlify detects Next.js and sets up the runtime.
- **Environment variables:** see [Website variables](#website-websiteenv). `NEXT_PUBLIC_*` values are baked in at build time, so redeploy after changing them.
- **Deploying:** push to `main`, or use **Deploys → Trigger deploy** in Netlify.

### Custom domain and HTTPS

`pixels.sohailcodes.xyz` is a CNAME to `pixels10.netlify.app`. Netlify must also list it under **Domain management → Custom domains** and issue a certificate for it under **HTTPS → Verify DNS configuration → Provision certificate**. Without that, Netlify serves its `*.netlify.app` certificate and browsers warn that the site isn't secure.

Check it with:

```bash
echo | openssl s_client -connect pixels.sohailcodes.xyz:443 -servername pixels.sohailcodes.xyz 2>/dev/null | openssl x509 -noout -subject
# should print CN=pixels.sohailcodes.xyz, not CN=*.netlify.app
```

If the website moves to another address, add it to the backend's `ALLOWED_ORIGINS` and set `NEXT_PUBLIC_SITE_URL`.

## Supabase

- **Postgres:** the backend connects through the pooler with the `DB_*`, `HOST` and `PASSWORD` variables. The backend creates missing tables at startup (`Base.metadata.create_all`), but there are no migrations, so column changes must be made by hand.
- **Auth:** Google is the only sign-in provider. Under **Authentication → Providers → Google**, the client ID is the **web** OAuth client (`1026701954227-r8npbs4m7vte67o1m1u3h2c9clgj3qoe.apps.googleusercontent.com`).
- **User rows:** the backend never creates rows in `users`; signed-in users get one from the Supabase side (a database trigger on sign-up). If likes fail with "User not found", check that trigger.
- **Who can upload:** uploads need `upload_permission = true` on the user's row. To grant it, in **SQL Editor**:
  ```sql
  update users set upload_permission = true where email = 'someone@example.com';
  ```
- **Storage:** public bucket `images`. Originals are at `images/<file>`, grid thumbnails at `images/thumbs/<file>.webp`.
- **Row Level Security** is on. With the public anon key, the tables return no rows, so the app and website get data only through the backend. Keep it on.
- **Free tier:** a project with no activity for a week gets **paused**. When that happens the backend fails at startup with `tenant/user … not found`, and the app shows "Couldn't load wallpapers". Restore it from the Supabase dashboard.

## Google sign-in

Sign-in uses one **web** OAuth client, whose ID is in the app code (`app/components/Signin.tsx`) and in Supabase. Google also needs an **Android** OAuth client for each key that signs the app:

| Android OAuth client | Package | SHA-1 |
|---|---|---|
| Debug builds (`app/android/app/debug.keystore`) | `com.sohail300.pixels` | `5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25` |
| Release builds (EAS keystore `4Li5ygU2Q_`) | `com.sohail300.pixels` | `E2:33:52:4B:E7:DD:CC:78:11:37:74:85:A7:8A:93:8E:08:AB:80:64` |

The app only asks for basic profile and email, so no extra scopes. Adding restricted scopes such as Google Drive makes Google block sign-in until the app passes verification.

**If the signing key ever changes** (sign-in fails with `DEVELOPER_ERROR`):

1. Get the new SHA-1. Run `npx eas-cli credentials -p android`, pick the profile, and read **SHA1 Fingerprint**. Or read it from an APK: `java -jar <Android SDK>/build-tools/<version>/lib/apksigner.jar verify --print-certs pixels.apk`.
2. In Google Cloud Console, open **APIs & Services → Credentials → Create credentials → OAuth client ID → Android**, with the package above and the new SHA-1. Each Android client holds one SHA-1, so add a client rather than editing one that's still in use.
3. Wait a few minutes, then try signing in again.

The **OAuth consent screen** (Audience / Publishing status) must say **In production**. In **Testing**, only listed test users can sign in.

## EAS Build

- **Project:** `@sohail300/pixels` (ID `0ba62d04-fabc-49ea-b98c-6cd0380fc06e`), Expo account `sohail300`.
- **Profiles** in `app/eas.json`: `production` and `preview` both build an installable APK against the Render backend, and `development` builds a dev client. `production` raises the build number automatically.
- **Signing:** every build uses the default EAS keystore `4Li5ygU2Q_`. Don't create or replace keystores in `eas credentials`. A new key means existing installs can't update, and Google sign-in needs a new SHA-1.
- **`"requireCommit": true`:** EAS uploads a clean copy of the last commit. Without it, the Windows EAS CLI uploaded git-ignored files too, including every `.env` file. Keep it on, and commit before building.
- **Native code** is generated on the build server from `app/app.json`. The local `app/android/` is never uploaded.
- **CPU types:** only `armeabi-v7a` and `arm64-v8a` (real phones), set by [`app/plugins/withAndroidAbis.js`](../app/plugins/withAndroidAbis.js).

## Environment variables

`.env` files are git-ignored. The `.env.example` files list the names, and the real values live on Render, on Netlify, and in local copies.

### Backend (`backend/.env`)

| Variable | What it is |
|---|---|
| `DB_USER`, `PASSWORD`, `HOST`, `DB_PORT`, `DBNAME` | Supabase Postgres connection (Project Settings → Database → Connection string → pooler) |
| `SUPABASE_URL` | `https://wfckkvltzcssotvuevly.supabase.co` |
| `SUPABASE_SECRET` | Service-role (secret) key, used for storage uploads. **Secret.** |
| `SUPABASE_JWT_SECRET` | Verifies users' access tokens. **Secret.** |
| `SUPABASE_ANON_KEY` | Public anon key |
| `ALGORITHM` | JWT algorithm, `HS256` |
| `PORT` | Port to listen on (Render sets this itself) |
| `ALLOWED_ORIGINS` | Comma-separated website origins allowed by CORS. Defaults to `http://localhost:3000,https://pixels.sohailcodes.xyz` |
| `PEXELS_API_KEY` | Only for `scripts/fetch_wallpapers.py` |

### App (`app/.env`, local only)

| Variable | What it is |
|---|---|
| `EXPO_PUBLIC_BACKEND_URL` | Backend for local development. EAS builds set it in `app/eas.json` instead. |

The Supabase URL and anon key for the app are in `app/secrets.js`. Both are public by design; the data stays protected by Row Level Security.

### Website (`website/.env`)

| Variable | What it is |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend base URL, without `/api`. Defaults to the Render URL |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | For sign-in on the upload page |
| `NEXT_PUBLIC_SITE_URL` | The website's own address, used for link previews. Defaults to `https://pixels.sohailcodes.xyz` |

## Secrets

- Never commit `.env` files, keystores, or the service-role key. `.gitignore` already excludes them.
- **Rotating:** change the value in Supabase (database password, or create a new secret key and revoke the old one), then update `backend/.env` and Render and redeploy. Avoid rotating the legacy JWT secret: it signs everyone out and changes the anon key built into the released app.

## Maintenance scripts (`backend/scripts/`)

Run from `backend/` with the venv's Python: `.venv/Scripts/python scripts/<name>.py`.

| Script | What it does |
|---|---|
| `generate_thumbnails.py [--dry-run]` | Creates missing grid thumbnails in `images/thumbs/`. Safe to re-run, since it skips existing ones. New uploads get a thumbnail automatically. |
| `fetch_wallpapers.py` | Downloads wallpapers from Pexels into `backend/images/` with a `manifest.json`. Needs `PEXELS_API_KEY`. |
| `seed_images.py` | Uploads `backend/images/` through the API using `manifest.json`. Set `UPLOAD_URL` and `TOKEN` (a user access token with upload permission) at the top of the file first. |

`backend/backups/` (git-ignored) holds JSON backups from one-off data fixes, such as the 2026-11-21 wallpaper rename and cleanup.

## Deploy checklist

1. Commit and push to `main`.
2. **Backend changed?** Check that Render deployed the new commit and that `https://pixels-yquv.onrender.com/api/explore?limit=1` answers.
3. **Website changed?** Check that Netlify deployed and that the site loads over HTTPS on `pixels.sohailcodes.xyz`.
4. **App changed?** Follow [RELEASING.md](RELEASING.md).
