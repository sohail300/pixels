import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useColorScheme,
} from "react-native";
import React, { useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { changeTheme } from "@/redux/ThemeSlice";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const Preferences = () => {
  const dispatch = useDispatch();
  const themeState = useSelector((state) => state.theme);
  const systemColorScheme = useColorScheme();

  const colorTheme = useMemo(() => {
    return themeState.data === "system" ? systemColorScheme : themeState.data;
  }, [themeState.data, systemColorScheme]);

  const isDark = colorTheme === "dark";

  return (
    <View>
      <Text
        style={{
          fontSize: 24,
          color: isDark ? Colors.dark.text : Colors.light.text,
          fontWeight: "700",
          marginBottom: 16,
        }}
      >
        Preferences
      </Text>

      <View
        style={{
          backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
          borderRadius: 16,
          padding: 4,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: isDark ? 0.3 : 0.1,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: isDark ? Colors.dark.text : Colors.light.text,
            fontWeight: "600",
            marginVertical: 12,
            marginLeft: 16,
          }}
        >
          Theme
        </Text>

        <View style={styles.themeSelector}>
          <Pressable
            style={[
              styles.themeOption,
              {
                backgroundColor:
                  themeState.data === "system"
                    ? isDark
                      ? "rgba(255,255,255,0.2)"
                      : "rgba(0,0,0,0.08)"
                    : "transparent",
              },
            ]}
            onPress={() => dispatch(changeTheme("system"))}
          >
            <Ionicons
              name="phone-portrait-outline"
              size={22}
              color={isDark ? Colors.dark.text : Colors.light.text}
            />
            <Text
              style={[
                styles.themeText,
                {
                  color: isDark ? Colors.dark.text : Colors.light.text,
                  opacity: themeState.data === "system" ? 1 : 0.7,
                },
              ]}
            >
              System
            </Text>
            {themeState.data === "system" && (
              <Ionicons
                name="checkmark-circle"
                size={20}
                color={isDark ? "#5fd4f4" : "#2196f3"}
                style={styles.checkIcon}
              />
            )}
          </Pressable>

          <Pressable
            style={[
              styles.themeOption,
              {
                backgroundColor:
                  themeState.data === "light"
                    ? isDark
                      ? "rgba(255,255,255,0.2)"
                      : "rgba(0,0,0,0.08)"
                    : "transparent",
              },
            ]}
            onPress={() => dispatch(changeTheme("light"))}
          >
            <Ionicons
              name="sunny-outline"
              size={22}
              color={isDark ? Colors.dark.text : Colors.light.text}
            />
            <Text
              style={[
                styles.themeText,
                {
                  color: isDark ? Colors.dark.text : Colors.light.text,
                  opacity: themeState.data === "light" ? 1 : 0.7,
                },
              ]}
            >
              Light
            </Text>
            {themeState.data === "light" && (
              <Ionicons
                name="checkmark-circle"
                size={20}
                color={isDark ? "#5fd4f4" : "#2196f3"}
                style={styles.checkIcon}
              />
            )}
          </Pressable>

          <Pressable
            style={[
              styles.themeOption,
              {
                backgroundColor:
                  themeState.data === "dark"
                    ? isDark
                      ? "rgba(255,255,255,0.2)"
                      : "rgba(0,0,0,0.08)"
                    : "transparent",
              },
            ]}
            onPress={() => dispatch(changeTheme("dark"))}
          >
            <Ionicons
              name="moon-outline"
              size={22}
              color={isDark ? Colors.dark.text : Colors.light.text}
            />
            <Text
              style={[
                styles.themeText,
                {
                  color: isDark ? Colors.dark.text : Colors.light.text,
                  opacity: themeState.data === "dark" ? 1 : 0.7,
                },
              ]}
            >
              Dark
            </Text>
            {themeState.data === "dark" && (
              <Ionicons
                name="checkmark-circle"
                size={20}
                color={isDark ? "#5fd4f4" : "#2196f3"}
                style={styles.checkIcon}
              />
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Preferences;

const styles = StyleSheet.create({
  themeSelector: {
    borderRadius: 12,
    overflow: "hidden",
  },
  themeOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  themeText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 12,
  },
  checkIcon: {
    marginLeft: "auto",
  },
});
