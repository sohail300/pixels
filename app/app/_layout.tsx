import "react-native-reanimated"; // must stay first for Reanimated to initialize correctly
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomSheetContext } from "@/context/BottomSheetContext";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import ThemeProvider from "@/components/ThemeProvider";
import { SessionContext } from "@/context/SessionContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [downloads, setDownloads] = useState(0);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [uploaderName, setUploaderName] = useState("");
  const [uploaderImage, setUploaderImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [id, setId] = useState("");

  const [session, setSession] = useState<any>(null);
  const [token, setToken] = useState<any>(null);

  const [loaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Add timeout to prevent infinite loading
  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hideAsync();
    }, 5000); // 5 second timeout
    return () => clearTimeout(timer);
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.container}>
        <SessionContext.Provider
          value={{
            session,
            setSession,
            token,
            setToken,
          }}
        >
          <BottomSheetContext.Provider
            value={{
              showBottomSheet,
              setShowBottomSheet,
              url,
              setUrl,
              name,
              setName,
              downloads,
              setDownloads,
              likes,
              setLikes,
              uploaderName,
              setUploaderName,
              uploaderImage,
              setUploaderImage,
              hasLiked,
              setHasLiked,
              categories,
              setCategories,
              id,
              setId,
            }}
          >
            <Provider store={store}>
              <ThemeProvider>
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
                </Stack>
              </ThemeProvider>
            </Provider>
          </BottomSheetContext.Provider>
        </SessionContext.Provider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
