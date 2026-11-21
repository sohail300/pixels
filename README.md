# Pixels

Wallpapers tailored for you: an Android app for browsing, searching, liking, and downloading wallpapers, with a website for downloads and uploads.

| Part | Folder | Stack | Hosted on |
|---|---|---|---|
| Mobile app | [`app/`](app) | Expo (React Native), Expo Router, Redux | APK on [GitHub Releases](https://github.com/sohail300/pixels/releases) |
| Backend API | [`backend/`](backend) | FastAPI, SQLAlchemy, Pillow | Render: `https://pixels-yquv.onrender.com` |
| Website | [`website/`](website) | Next.js 14, Tailwind | Netlify: `https://pixels.sohailcodes.xyz` |
| Data and auth | — | Supabase (Postgres, Auth, Storage) | Supabase project `wfckkvltzcssotvuevly` |

```
Android app ──┐
              ├──> Backend API (Render) ──> Supabase Postgres
Website ──────┘          │
   │                     └──> Supabase Storage (bucket "images")
   └── Google sign-in via Supabase Auth (app and website)
```

## Docs

- **[Development](docs/DEVELOPMENT.md)**: running the backend, app, and website locally, including testing on a phone over USB.
- **[Releasing the app](docs/RELEASING.md)**: shipping a new Android version through EAS and GitHub Releases.
- **[Deployment](docs/DEPLOYMENT.md)**: Render, Netlify, Supabase, Google sign-in, EAS, environment variables, secrets, and maintenance scripts.

## Download

The latest Android APK is always at:

```
https://github.com/sohail300/pixels/releases/latest/download/pixels.apk
```
