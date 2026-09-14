import About from "@/components/About";
import Preferences from "@/components/Preferences";
import Signin from "@/components/Signin";
import { Colors } from "@/constants/Colors";
import { SessionContext } from "@/context/SessionContext";
import { useContext, useMemo } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const getInitials = (name?: string | null, email?: string | null) => {
  if (name) {
    const parts = name.trim().split(/\s+/);
    return parts.length > 1
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : parts[0].slice(0, 2).toUpperCase();
  }
  if (email) return email.split("@")[0].slice(0, 2).toUpperCase();
  return "?";
};

export default function AccountPage() {
  const themeState = useSelector((state: RootState) => state.theme);
  const systemColorScheme = useColorScheme();
  const { session } = useContext(SessionContext);
  const likedCount = useSelector(
    (state: RootState) => state.likedWallpapers.likedIds.length
  );
  const router = useRouter();

  const colorTheme = useMemo(() => {
    return themeState.data === "system" ? systemColorScheme : themeState.data;
  }, [themeState.data, systemColorScheme]);

  const isDark = colorTheme === "dark";
  const email: string | undefined = session?.user?.email;
  const avatarUrl: string | undefined =
    session?.user?.user_metadata?.avatar_url;
  const fullName: string | undefined = session?.user?.user_metadata?.full_name;
  const displayName = fullName ?? email ?? "Signed in";

  const textColor = isDark ? Colors.dark.text : Colors.light.text;
  const mutedColor = isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)";

  const chipScale = useSharedValue(1);
  const chipStyle = useAnimatedStyle(() => ({
    transform: [{ scale: chipScale.value }],
  }));

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDark
          ? Colors.dark.background
          : Colors.light.background,
      }}
    >
      <LinearGradient
        colors={
          isDark
            ? ["rgba(253,215,0,0.14)", "rgba(253,215,0,0)"]
            : ["rgba(253,215,0,0.22)", "rgba(253,215,0,0)"]
        }
        locations={[0, 1]}
        pointerEvents="none"
        style={styles.ambientGlow}
      />

      <ScrollView
        persistentScrollbar={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 12,
          paddingBottom: 80,
        }}
      >
        <Animated.View entering={FadeInDown.duration(400)}>
          <Text style={[styles.pageTitle, { color: textColor }]}>
            Account
          </Text>
          <Text style={[styles.pageSubtitle, { color: mutedColor }]}>
            {session
              ? "Manage your profile and preferences"
              : "Sign in to sync your likes across devices"}
          </Text>
        </Animated.View>

        {session && (
          <Animated.View
            entering={FadeInDown.delay(80).duration(450)}
            style={[
              styles.heroCard,
              {
                backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
                shadowColor: isDark ? "#000" : "#8a7300",
                borderColor: isDark
                  ? "rgba(253,215,0,0.08)"
                  : "rgba(253,215,0,0.18)",
              },
            ]}
          >
            <View style={styles.heroRow}>
              {avatarUrl ? (
                <Image
                  source={{ uri: avatarUrl }}
                  style={styles.avatar}
                  resizeMode="cover"
                />
              ) : (
                <LinearGradient
                  colors={["#fdd700", "#f5a623"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.avatar}
                >
                  <Text style={styles.avatarText}>
                    {getInitials(fullName, email)}
                  </Text>
                </LinearGradient>
              )}

              <View style={styles.heroTextBlock}>
                <Text
                  numberOfLines={1}
                  style={[styles.heroEmail, { color: textColor }]}
                >
                  {displayName}
                </Text>
                <Text
                  numberOfLines={1}
                  style={[styles.statusText, { color: mutedColor }]}
                >
                  {email ?? "No email on file"}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.heroDivider,
                {
                  backgroundColor: isDark
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(0,0,0,0.06)",
                },
              ]}
            />

            <AnimatedPressable
              onPressIn={() => {
                chipScale.value = withSpring(0.96, {
                  damping: 16,
                  stiffness: 320,
                });
              }}
              onPressOut={() => {
                chipScale.value = withSpring(1, {
                  damping: 14,
                  stiffness: 260,
                });
              }}
              onPress={() => router.push("/ForYou")}
              style={[
                styles.statChip,
                chipStyle,
                {
                  backgroundColor: isDark
                    ? "rgba(253,215,0,0.09)"
                    : "rgba(253,215,0,0.12)",
                },
              ]}
            >
              <View style={styles.statChipLeft}>
                <Ionicons name="heart" size={16} color="#f5a623" />
                <Text style={[styles.statChipText, { color: textColor }]}>
                  <Text style={styles.statChipCount}>{likedCount}</Text>{" "}
                  {likedCount === 1 ? "wallpaper" : "wallpapers"} liked
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)"}
              />
            </AnimatedPressable>
          </Animated.View>
        )}

        {!session && (
          <Animated.View
            entering={FadeInDown.delay(80).duration(450)}
            style={{ marginTop: 24 }}
          >
            <Signin />
          </Animated.View>
        )}

        <Animated.View
          entering={FadeInDown.delay(160).duration(450)}
          style={{ marginTop: 28 }}
        >
          <Preferences />
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(220).duration(450)}
          style={{ marginTop: 28 }}
        >
          <About />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ambientGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 220,
  },
  pageTitle: {
    fontFamily: "Poppins",
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: -0.6,
    marginBottom: 6,
  },
  pageSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    letterSpacing: 0.1,
  },
  heroCard: {
    marginTop: 24,
    borderRadius: 22,
    borderWidth: 1,
    padding: 20,
    overflow: "hidden",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.14,
    shadowRadius: 14,
    elevation: 4,
  },
  heroRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 23,
    fontWeight: "800",
    color: "#1c1c1c",
    letterSpacing: 0.3,
  },
  heroTextBlock: {
    flex: 1,
    marginLeft: 16,
  },
  heroEmail: {
    fontFamily: "Poppins",
    fontSize: 18,
    lineHeight: 22,
  },
  statusText: {
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.1,
    marginTop: 6,
  },
  heroDivider: {
    height: 1,
    marginVertical: 18,
  },
  statChip: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  statChipLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  statChipText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
    marginLeft: 8,
  },
  statChipCount: {
    fontWeight: "700",
    fontVariant: ["tabular-nums"],
  },
});
