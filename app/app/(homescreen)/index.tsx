import BottomSheetComponent from "@/components/BottomSheet";
import HomePage from "@/components/HomePage";
import { Colors } from "@/constants/Colors";
import { BottomSheetContext } from "@/context/BottomSheetContext";
import { initializeTheme } from "@/redux/ThemeSlice";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { Session } from "@supabase/supabase-js";
import { useContext, useEffect, useState } from "react";
import { useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { supabase } from "../../lib/supabase";
import { SessionContext } from "@/context/SessionContext";

export default function ExplorePage() {
  const {
    showBottomSheet,
    setShowBottomSheet,
    id,
    name,
    url,
    downloads,
    likes,
    uploaderName,
    hasLiked,
    categories,
  } = useContext(BottomSheetContext);

  const { session, setSession } = useContext(SessionContext);

  const dispatch = useDispatch();
  initializeTheme(dispatch);

  const themeState = useSelector((state) => state.theme);
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
      <View style={{ flex: 1 }}>
        <HomePage />
      </View>

      {showBottomSheet && (
        <BottomSheetComponent
          close={() => setShowBottomSheet(false)}
          id={id}
          name={name}
          url={url}
          downloads={downloads}
          likes={likes}
          uploaderName={uploaderName}
          hasLiked={hasLiked}
          categories={categories}
        />
      )}
    </SafeAreaView>
  );
}
