# Development

How to run the backend, the Android app, and the website on your own machine. Commands are for Git Bash on Windows, so adjust the paths elsewhere.

## Prerequisites

- **Node.js** 20+ and npm
- **Python 3.12** (the version the backend's Dockerfile uses; 3.13+ is too new for some pinned packages)
- **Android Studio**, for the Android SDK and `adb`, plus **JDK 17**
- An Android phone with **USB debugging** on (Developer options). On Xiaomi/Redmi/POCO, also turn on **Install via USB** and **USB debugging (Security settings)**.
- A copy of each `.env` file (see [Environment variables](DEPLOYMENT.md#environment-variables)). They're git-ignored, so ask the owner or rebuild them from the `.env.example` files.

## Backend (`backend/`)

```bash
cd backend
py -3.12 -m venv .venv
.venv/Scripts/python -m pip install -r requirements.txt
cp .env.example .env      # then fill in the values
.venv/Scripts/python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

API docs are at http://localhost:8000/docs once it's running.

**Port 8000 busy?** On the owner's PC, port 8000 is held by a `netsh portproxy` rule that forwards to WSL. Run the backend on another port, e.g. `--port 8001`, and adjust the phone tunnel below.

There are no automated tests yet. Test by calling the API, e.g. `curl "http://localhost:8000/api/explore?skip=0&limit=2"`.

## Android app (`app/`)

```bash
cd app
npm install
```

### First build on a phone over USB

1. Plug in the phone, accept the "Allow USB debugging?" prompt, and check it shows up in `adb devices`.
2. Point the phone's `localhost` at your PC, so the app reaches your local backend and Metro:
   ```bash
   adb reverse tcp:8081 tcp:8081   # Metro (JavaScript bundler)
   adb reverse tcp:8000 tcp:8000   # backend; use tcp:8000 tcp:8001 if your backend runs on 8001
   ```
   These tunnels reset whenever the phone reconnects, so run them again if the app suddenly can't connect.
3. Build, install, and start Metro, pointing the app at the local backend:
   ```bash
   EXPO_PUBLIC_BACKEND_URL=http://localhost:8000/api npx expo run:android
   ```

After the first build you only need Metro: `EXPO_PUBLIC_BACKEND_URL=http://localhost:8000/api npx expo start`, then open the app on the phone. Code changes reload instantly.

Without `EXPO_PUBLIC_BACKEND_URL`, the app uses `app/.env`, and failing that the production backend on Render. See [`app/lib/config.ts`](../app/lib/config.ts).

### Native project (`app/android/`)

`app/android/` is generated from `app/app.json` and is git-ignored. If you change icons, the splash screen, permissions, or plugins in `app.json`, regenerate it:

```bash
npx expo prebuild -p android --clean
```

If Gradle fails with **"No variants exist"** for React Native libraries, the generated autolinking cache points at an old folder path (this happens after moving the project). Delete `app/android/build/generated/autolinking`, or run the `prebuild --clean` above.

### Google sign-in in debug builds

Debug builds are signed with `app/android/app/debug.keystore`, SHA-1 `5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25`, which is registered with Google. `prebuild --clean` regenerates the same keystore, so sign-in keeps working.

A debug build and a release APK are signed with different keys and can't be installed over each other. Uninstall one before installing the other.

### Type check

```bash
npx tsc --noEmit -p .
```

## Website (`website/`)

```bash
cd website
npm install
cp .env.example .env      # then fill in the values
npm run dev               # http://localhost:3000
npm run build             # production build check
```

The upload page calls the backend in `NEXT_PUBLIC_API_URL`. When testing against a local backend, `http://localhost:3000` is already an allowed CORS origin.
