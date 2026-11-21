import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import React, { useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Colors } from "@/constants/Colors";

/**
 * Centered message for a wallpaper list that has nothing to show: a failed load
 * (with a retry button) or an empty result. Matches the Liked tab's empty state.
 */
const ListMessage = ({
  icon,
  title,
  subtitle,
  actionLabel,
  onAction,
}: {
  readonly icon: React.ComponentProps<typeof Ionicons>["name"];
  readonly title: string;
  readonly subtitle?: string;
  readonly actionLabel?: string;
  readonly onAction?: () => void;
}) => {
  const themeState = useSelector((state: RootState) => state.theme);
  const systemColorScheme = useColorScheme();
  const isDark = useMemo(() => {
    const theme =
      themeState.data === "system" ? systemColorScheme : themeState.data;
    return theme === "dark";
  }, [themeState.data, systemColorScheme]);

  const textColor = isDark ? Colors.dark.text : Colors.light.text;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: isDark
              ? "rgba(253,215,0,0.10)"
              : "rgba(253,215,0,0.12)",
          },
        ]}
      >
        <Ionicons name={icon} size={36} color={Colors.light.accent} />
      </View>
      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
      {subtitle ? (
        <Text style={[styles.subtitle, { color: textColor }]}>{subtitle}</Text>
      ) : null}
      {actionLabel && onAction ? (
        <TouchableOpacity
          style={styles.button}
          onPress={onAction}
          accessibilityRole="button"
        >
          <Ionicons name="refresh" size={18} color="#1C1C1C" />
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default ListMessage;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingVertical: 64,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontFamily: "Poppins",
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    opacity: 0.7,
    lineHeight: 22,
  },
  button: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.light.accent,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    minHeight: 48,
  },
  buttonText: {
    color: "#1C1C1C",
    fontSize: 16,
    fontWeight: "600",
  },
});
