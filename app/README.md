# Pixels Android app

Expo (React Native) app for browsing, searching, liking, and downloading wallpapers. File-based routing with Expo Router lives in `app/`.

- **Run it locally:** [docs/DEVELOPMENT.md](../docs/DEVELOPMENT.md#android-app-app)
- **Release a new version:** [docs/RELEASING.md](../docs/RELEASING.md)
- **Build, signing, and Google sign-in setup:** [docs/DEPLOYMENT.md](../docs/DEPLOYMENT.md#eas-build)

Quick start, with the phone plugged in over USB and the backend running locally:

```bash
npm install
adb reverse tcp:8081 tcp:8081 && adb reverse tcp:8000 tcp:8000
EXPO_PUBLIC_BACKEND_URL=http://localhost:8000/api npx expo run:android
```

## Where things are

| Path | What |
|---|---|
| `app/(tabs)/` | Explore, For You, and Account tabs |
| `components/BottomSheet.tsx` | Wallpaper detail sheet: like, download, save to the gallery |
| `lib/config.ts` | Backend URL and storage bucket URL |
| `lib/api.ts` | `fetch` with timeout, plus auth headers |
| `lib/updateCheck.ts` | Startup check for a newer release on GitHub |
| `lib/images.ts` | Full-size and thumbnail image URLs |
| `redux/` | Global state: theme and liked wallpapers |
| `plugins/withAndroidAbis.js` | Limits APK native code to real-phone CPUs |
| `app.json` / `eas.json` | App config (version, icons, splash) and EAS build profiles |
