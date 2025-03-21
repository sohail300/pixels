import About from "@/components/About";
import Preferences from "@/components/Preferences";
import Signin from "@/components/Signin";
import { Colors } from "@/constants/Colors";
import { SessionContext } from "@/context/SessionContext";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useContext, useMemo } from "react";
import { useColorScheme } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

export default function AccountPage() {
  const themeState = useSelector((state) => state.theme);
  const systemColorScheme = useColorScheme();

  const { session, setSession } = useContext(SessionContext);

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
            ? Colors.dark.background
            : Colors.light.background,
      }}
    >
      <ScrollView
        persistentScrollbar={false}
        showsVerticalScrollIndicator={false}
      >
        {!session && <Signin />}
        <Preferences />
        <About />
      </ScrollView>
    </SafeAreaView>
  );
}
