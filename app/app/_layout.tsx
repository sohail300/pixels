import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { BottomSheetContext } from "@/context/BottomSheetContext";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import ThemeProvider from "@/components/ThemeProvider";
import Animated, { FadeIn } from "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");

  const [loaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetContext.Provider
        value={{
          showBottomSheet,
          setShowBottomSheet,
          url,
          setUrl,
          name,
          setName,
        }}
      >
        <Provider store={store}>
          <ThemeProvider>
            <Animated.View style={{ flex: 1 }} entering={FadeIn.duration(300)}>
              <Stack screenOptions={{ headerShown: false }}></Stack>
            </Animated.View>
          </ThemeProvider>
        </Provider>
      </BottomSheetContext.Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
