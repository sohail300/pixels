import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useContext, useMemo } from "react";
import { Colors } from "@/constants/Colors";
import { supabase } from "../lib/supabase";
import { SessionContext } from "@/context/SessionContext";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { RootState } from "@/redux/store";

const About = () => {
  const themeState = useSelector((state: RootState) => state.theme);
  const systemColorScheme = useColorScheme();
  const { session } = useContext(SessionContext);

  const theme = useMemo(() => {
    return themeState.data === "system" ? systemColorScheme : themeState.data;
  }, [themeState.data, systemColorScheme]);

  const isDark = theme === "dark";

  const handleRedirect = (url: string) => {
    Linking.openURL(url);
  };

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
        About
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
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() =>
            handleRedirect("https://pixels.heysohail.xyz/privacy-policy")
          }
        >
          <View style={styles.menuItemContent}>
            <Ionicons
              name="shield-checkmark-outline"
              size={22}
              color={isDark ? Colors.dark.text : Colors.light.text}
            />
            <Text
              style={[
                styles.menuText,
                { color: isDark ? Colors.dark.text : Colors.light.text },
              ]}
            >
              Privacy Policy
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.3)"}
          />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() =>
            handleRedirect("https://pixels.heysohail.xyz/terms-of-services")
          }
        >
          <View style={styles.menuItemContent}>
            <Ionicons
              name="document-text-outline"
              size={22}
              color={isDark ? Colors.dark.text : Colors.light.text}
            />
            <Text
              style={[
                styles.menuText,
                { color: isDark ? Colors.dark.text : Colors.light.text },
              ]}
            >
              Terms of Service
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.3)"}
          />
        </TouchableOpacity>

        <View style={styles.divider} />

        <View style={styles.menuItem}>
          <View style={styles.menuItemContent}>
            <Ionicons
              name="information-circle-outline"
              size={22}
              color={isDark ? Colors.dark.text : Colors.light.text}
            />
            <Text
              style={[
                styles.menuText,
                { color: isDark ? Colors.dark.text : Colors.light.text },
              ]}
            >
              Version
            </Text>
          </View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)",
            }}
          >
            1.0.0
          </Text>
        </View>

        {session && (
          <>
            <View style={styles.divider} />
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                supabase.auth.signOut();
              }}
            >
              <View style={styles.menuItemContent}>
                <Ionicons
                  name="log-out-outline"
                  size={22}
                  color={isDark ? "#ff6b6b" : "#e53935"}
                />
                <Text
                  style={[
                    styles.menuText,
                    { color: isDark ? "#ff6b6b" : "#e53935" },
                  ]}
                >
                  Logout
                </Text>
              </View>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(150,150,150,0.15)",
    marginHorizontal: 16,
  },
});
