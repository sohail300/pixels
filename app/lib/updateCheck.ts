import { Alert, Linking, Platform } from "react-native";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchWithTimeout } from "@/lib/api";

/**
 * The app is distributed as an APK through GitHub Releases, not the Play Store,
 * so nothing updates it automatically. On startup we ask GitHub for the latest
 * release and offer the download when it's newer than this build.
 *
 * Releases are tagged "v<version>" (matching `version` in app.json) and carry
 * the APK as an asset named "pixels.apk".
 */
const LATEST_RELEASE_URL =
  "https://api.github.com/repos/sohail300/pixels/releases/latest";
const APK_ASSET_NAME = "pixels.apk";
const DISMISSED_KEY = "update-check:dismissed-version";

/** Compares dotted versions: >0 if a is newer, <0 if older, 0 if equal. */
export function compareVersions(a: string, b: string): number {
  const pa = a.split(".").map((n) => parseInt(n, 10) || 0);
  const pb = b.split(".").map((n) => parseInt(n, 10) || 0);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const diff = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

export async function checkForUpdate(): Promise<void> {
  if (__DEV__ || Platform.OS !== "android") return;

  const current = Constants.expoConfig?.version;
  if (!current) return;

  try {
    const response = await fetchWithTimeout(
      LATEST_RELEASE_URL,
      { headers: { Accept: "application/vnd.github+json" } },
      10000
    );
    if (!response.ok) return;
    const release = await response.json();

    const latest = String(release.tag_name ?? "").replace(/^v/i, "");
    if (!latest || compareVersions(latest, current) <= 0) return;

    // Ask once per new version; "Later" stays quiet until the next release.
    const dismissed = await AsyncStorage.getItem(DISMISSED_KEY).catch(() => null);
    if (dismissed === latest) return;

    const apk = (release.assets ?? []).find(
      (asset: any) => asset?.name === APK_ASSET_NAME
    );
    const downloadUrl: string = apk?.browser_download_url ?? release.html_url;
    if (!downloadUrl) return;

    Alert.alert(
      "Update available",
      `Pixels ${latest} is out (you have ${current}). Download and install it to get the latest fixes.`,
      [
        {
          text: "Later",
          style: "cancel",
          onPress: () => {
            AsyncStorage.setItem(DISMISSED_KEY, latest).catch(() => {});
          },
        },
        { text: "Update", onPress: () => Linking.openURL(downloadUrl) },
      ]
    );
  } catch {
    // Offline or GitHub unreachable: try again next launch.
  }
}
