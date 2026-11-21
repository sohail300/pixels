# Releasing the Android app

The app isn't on the Play Store. Each version is an APK built by EAS and published on [GitHub Releases](https://github.com/sohail300/pixels/releases). Installed apps find new versions on their own: at startup the app asks GitHub for the latest release and offers the download when it's newer (see [`app/lib/updateCheck.ts`](../app/lib/updateCheck.ts)).

## How versions fit together

| What | Where | Rule |
|---|---|---|
| App version, e.g. `1.0.1` | `"version"` in [`app/app.json`](../app/app.json) | Bump it for every release. The update check compares this number. |
| Release tag | GitHub release | Must be `v` + the app version, e.g. `v1.0.1`. |
| APK file name | Release asset | Must be exactly `pixels.apk`. The website and the app's update check look for that name. |
| Build number (`versionCode`) | Managed by EAS | Goes up automatically with each production build. Don't touch it. |

> **Never publish a new tag without bumping `app.json` first.** If release `v1.0.1` contains a `1.0.0` build, every install keeps seeing "Update available", installs the same APK, and sees the prompt again.

## Steps

Run these from the repository root in Git Bash. You need the [GitHub CLI](https://cli.github.com) (`gh auth status` should show you're logged in) and to be logged in to Expo (`npx eas-cli whoami` should print `sohail300`).

### 1. Bump the version and commit

Edit `app/app.json` and raise `"version"`, for example from `"1.0.0"` to `"1.0.1"`. Use the patch number for fixes, the minor number for new features, and the major number for big changes.

```bash
git add app/app.json
git commit -m "chore(app): release 1.0.1"
git push
```

EAS only builds committed code (`"requireCommit": true` in `app/eas.json`), so commit everything you want in the release before building.

### 2. Build the APK

```bash
cd app
npx eas-cli build -p android --profile production
```

The build runs in Expo's cloud and takes about 15–20 minutes. When it finishes, the command prints the build page and the APK link, which looks like `https://expo.dev/artifacts/eas/....apk`. You can also find it later on the [builds page](https://expo.dev/accounts/sohail300/projects/pixels/builds).

### 3. Download the APK and check it

Still in `app/`:

```bash
curl -L -o pixels.apk "https://expo.dev/artifacts/eas/<id>.apk"   # the link from step 2
```

Install it on your phone and check that it opens, sign-in works, and wallpapers load. Over USB that's `adb install -r pixels.apk`, or open the APK link on the phone. Because it's signed with the same key as earlier releases, it installs as an update without uninstalling.

### 4. Publish the release

From the folder where `pixels.apk` is, so here still `app/`:

```bash
gh release create v1.0.1 pixels.apk --title "Pixels 1.0.1" --notes "What changed in this version"
rm pixels.apk
```

`no matches found for 'pixels.apk'` means you're not in the folder that holds the file.

### 5. Confirm it's live

```bash
curl -sI -L https://github.com/sohail300/pixels/releases/latest/download/pixels.apk | grep -i "content-length"
```

Open the app on a phone that has the previous version. Within a few seconds of starting, it shows **Update available**.

## If something goes wrong

**The wrong APK was published.** Delete the release and its tag, then publish again:

```bash
gh release delete v1.0.1 --cleanup-tag --yes
```

**`INSTALL_FAILED_UPDATE_INCOMPATIBLE` / "App not installed".** The APK on the phone was signed with a different key, for example a local debug build. Uninstall Pixels, then install the release APK. Every EAS build uses keystore `4Li5ygU2Q_`, as long as nobody changes the credentials in `eas credentials`.

**Google sign-in fails with `DEVELOPER_ERROR` in a new build.** The signing key changed, so its SHA-1 isn't registered with Google. See [Google sign-in](DEPLOYMENT.md#google-sign-in).

**The build won't start: "uncommitted changes".** Commit or stash your changes. This is intentional, see [the EAS section](DEPLOYMENT.md#eas-build).

**No update prompt appears.** Check that the tag is `v` + the new version, that the asset is named `pixels.apk`, and that the release isn't marked as a pre-release (GitHub's "latest" skips pre-releases). If someone tapped **Later**, the prompt stays hidden for that version until the next release.
