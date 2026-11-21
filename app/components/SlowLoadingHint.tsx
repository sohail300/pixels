import { Text, StyleSheet, useColorScheme } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Colors } from "@/constants/Colors";

const SHOW_AFTER_MS = 6000;

/**
 * Shown under the loading skeleton when the first load is slow, which usually
 * means the backend is waking up from sleep. Renders nothing for fast loads.
 */
const SlowLoadingHint = ({ active }: { readonly active: boolean }) => {
  const [visible, setVisible] = useState(false);
  const themeState = useSelector((state: RootState) => state.theme);
  const systemColorScheme = useColorScheme();
  const isDark = useMemo(() => {
    const theme =
      themeState.data === "system" ? systemColorScheme : themeState.data;
    return theme === "dark";
  }, [themeState.data, systemColorScheme]);

  useEffect(() => {
    if (!active) {
      setVisible(false);
      return;
    }
    const timeoutId = setTimeout(() => setVisible(true), SHOW_AFTER_MS);
    return () => clearTimeout(timeoutId);
  }, [active]);

  if (!visible) return null;

  return (
    <Text
      style={[
        styles.text,
        { color: isDark ? Colors.dark.text : Colors.light.text },
      ]}
    >
      Waking up the server. This can take up to a minute.
    </Text>
  );
};

export default SlowLoadingHint;

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 16,
  },
});
