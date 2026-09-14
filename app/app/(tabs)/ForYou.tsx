import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Liked from "../foryou/Liked";
import Suggested from "../foryou/Suggested";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useColorScheme,
  Pressable,
} from "react-native";
import logo from "@/assets/images/logo.png";
import user from "@/assets/images/user.jpg";
import { Colors } from "@/constants/Colors";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { supabase } from "../../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { RootState } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  const themeState = useSelector((state: RootState) => state.theme);
  const systemColorScheme = useColorScheme();

  const colorTheme = useMemo(() => {
    return themeState.data === "system" ? systemColorScheme : themeState.data;
  }, [themeState.data, systemColorScheme]);

  const isDark = colorTheme === "dark";
  const backgroundColor = isDark
    ? Colors.dark.background
    : Colors.light.background;
  const cardColor = isDark ? Colors.dark.card : Colors.light.card;
  const textColor = isDark ? Colors.dark.text : Colors.light.text;
  const mutedColor = isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)";

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const firstName: string | undefined =
    session?.user?.user_metadata?.full_name?.split(" ")[0];
  const avatarUrl: string | undefined = session?.user?.user_metadata?.avatar_url;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logoImage} />
          <Text style={[styles.appName, { color: textColor }]}>Pixels</Text>
        </View>

        <Pressable
          onPress={() => router.push("/Account")}
          style={styles.profileButton}
        >
          <View style={styles.userInfo}>
            <Text
              numberOfLines={1}
              style={[styles.greeting, { color: textColor }]}
            >
              {firstName ? `Hi, ${firstName}` : "Hi there"}
            </Text>
          </View>

          <View
            style={[
              styles.avatarRing,
              {
                borderColor: isDark
                  ? "rgba(253,215,0,0.35)"
                  : "rgba(253,215,0,0.5)",
              },
            ]}
          >
            <Image
              source={avatarUrl ? { uri: avatarUrl } : user}
              style={styles.avatarImage}
            />
          </View>
        </Pressable>
      </View>

      <View style={styles.tabContainer}>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: [
              styles.tabBar,
              {
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(0,0,0,0.045)",
              },
            ],
            tabBarIndicatorStyle: [
              styles.tabIndicator,
              { backgroundColor: cardColor },
            ],
            tabBarActiveTintColor: textColor,
            tabBarInactiveTintColor: mutedColor,
            tabBarItemStyle: styles.tabItem,
            tabBarPressColor: "transparent",
          }}
        >
          <Tab.Screen
            name="Suggested"
            component={Suggested}
            options={{
              tabBarLabel: ({ focused, color }) => (
                <View style={styles.tabLabelRow}>
                  <Ionicons
                    name={focused ? "sparkles" : "sparkles-outline"}
                    size={15}
                    color={focused ? "#f5a623" : color}
                  />
                  <Text style={[styles.tabLabelText, { color }]}>
                    Suggested
                  </Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Liked"
            component={Liked}
            options={{
              tabBarLabel: ({ focused, color }) => (
                <View style={styles.tabLabelRow}>
                  <Ionicons
                    name={focused ? "heart" : "heart-outline"}
                    size={15}
                    color={focused ? "#f5a623" : color}
                  />
                  <Text style={[styles.tabLabelText, { color }]}>Liked</Text>
                </View>
              ),
            }}
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  profileButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoImage: {
    width: 40,
    height: 40,
    borderRadius: 12,
  },
  appName: {
    fontFamily: "Poppins",
    fontSize: 21,
    letterSpacing: -0.3,
    marginLeft: 10,
  },
  userInfo: {
    alignItems: "flex-end",
    marginRight: 10,
    maxWidth: 160,
  },
  greeting: {
    fontFamily: "Poppins",
    fontSize: 15,
  },
  avatarRing: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 2,
    padding: 2,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  tabContainer: {
    flex: 1,
    width: "100%",
  },
  tabBar: {
    marginHorizontal: 20,
    marginBottom: 8,
    height: 46,
    borderRadius: 14,
    elevation: 0,
    shadowOpacity: 0,
    shadowColor: "transparent",
    borderWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderStyle: "solid",
  },
  tabIndicator: {
    top: 4,
    bottom: 4,
    borderRadius: 11,
    elevation: 0,
    shadowOpacity: 0,
    shadowColor: "transparent",
  },
  tabItem: {
    padding: 0,
  },
  tabLabelRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  tabLabelText: {
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.1,
    marginLeft: 6,
  },
});
