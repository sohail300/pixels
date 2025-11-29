import About from "@/components/About";
import Preferences from "@/components/Preferences";
import Signin from "@/components/Signin";
import { Colors } from "@/constants/Colors";
import { SessionContext } from "@/context/SessionContext";
import { useContext, useMemo } from "react";
import { useColorScheme, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function AccountPage() {
  const themeState = useSelector((state: RootState) => state.theme);
  const systemColorScheme = useColorScheme();
  const { session } = useContext(SessionContext);

  const colorTheme = useMemo(() => {
    return themeState.data === "system" ? systemColorScheme : themeState.data;
  }, [themeState.data, systemColorScheme]);

  const isDark = colorTheme === "dark";

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDark
          ? Colors.dark.background
          : Colors.light.background,
      }}
    >
      <ScrollView
        persistentScrollbar={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}
      >
        {!session && <Signin />}
        <View style={{ marginTop: 24 }}>
          <Preferences />
        </View>
        <View style={{ marginTop: 24 }}>
          <About />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
