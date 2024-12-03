import About from "@/components/About";
import Preferences from "@/components/Preferences";
import Signin from "@/components/Signin";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useMemo } from "react";
import {
  View,
  Text,
  Button,
  Pressable,
  StyleSheet,
  Image,
  useColorScheme,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

export default function AccountPage() {
  const themeState = useSelector((state) => state.theme);
  const systemColorScheme = useColorScheme();

  const colorTheme = useMemo(() => {
    return themeState.data === "system" ? systemColorScheme : themeState.data;
  }, [themeState.data, systemColorScheme]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor:
          colorTheme === "dark"
            ? DarkTheme.colors.background
            : DefaultTheme.colors.background,
      }}
    >
      <ScrollView
        persistentScrollbar={false}
        showsVerticalScrollIndicator={false}
      >
        <Signin />
        <Preferences />
        <About />
      </ScrollView>
    </SafeAreaView>
  );
}
