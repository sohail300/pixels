import HomePage from "@/components/HomePage";
import { Colors } from "@/constants/Colors";
import { initializeTheme } from "@/redux/ThemeSlice";
import { useContext, useEffect } from "react";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { supabase } from "../../lib/supabase";
import { SessionContext } from "@/context/SessionContext";
import { RootState } from "@/redux/store";

export default function ExplorePage() {
  const { setSession } = useContext(SessionContext);

  const dispatch = useDispatch();
  initializeTheme(dispatch);

  const themeState = useSelector((state: RootState) => state.theme);
  const systemColorScheme = useColorScheme();

  const colorTheme =
    themeState.data !== "system" ? themeState.data : systemColorScheme;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          colorTheme === "dark"
            ? Colors.dark.background
            : Colors.light.background,
      }}
    >
      <HomePage />
    </SafeAreaView>
  );
}
