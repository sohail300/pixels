// Limits the native code in Android builds to real phone CPUs. The default also
// bundles x86 and x86_64 (emulators only), which adds ~30 MB to the APK.
const { withGradleProperties } = require("expo/config-plugins");

const DEFAULT_ABIS = ["armeabi-v7a", "arm64-v8a"];

module.exports = function withAndroidAbis(config, abis = DEFAULT_ABIS) {
  return withGradleProperties(config, (config) => {
    const key = "reactNativeArchitectures";
    config.modResults = config.modResults.filter(
      (item) => !(item.type === "property" && item.key === key)
    );
    config.modResults.push({ type: "property", key, value: abis.join(",") });
    return config;
  });
};
