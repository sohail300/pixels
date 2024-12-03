import BottomSheetComponent from "@/components/BottomSheet";
import HomePage from "@/components/HomePage";
import { BottomSheetContext } from "@/context/BottomSheetContext";
import { initializeTheme } from "@/redux/ThemeSlice";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useContext } from "react";
import { useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function ExplorePage() {
  const { showBottomSheet, setShowBottomSheet, name, url } =
    useContext(BottomSheetContext);

  const dispatch = useDispatch();
  initializeTheme(dispatch);

  const themeState = useSelector((state) => state.theme);
  console.log(themeState);
  const systemColorScheme = useColorScheme();

  const colorTheme =
    themeState.data !== "system" ? themeState.data : systemColorScheme;
  console.log(colorTheme);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          colorTheme === "dark"
            ? DarkTheme.colors.background
            : DefaultTheme.colors.background,
      }}
    >
      <View style={{ flex: 1 }}>
        <HomePage />
      </View>

      {showBottomSheet && (
        <BottomSheetComponent
          close={() => setShowBottomSheet(false)}
          name={name}
          url={url}
        />
      )}
    </SafeAreaView>
  );
}
