import BottomSheetComponent from "@/components/BottomSheet";
import HomePage from "@/components/HomePage";
import { BottomSheetContext } from "@/context/BottomSheetContext";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useContext } from "react";
import { useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExplorePage() {
  const { showBottomSheet, setShowBottomSheet, name, url } =
    useContext(BottomSheetContext);

  const colorTheme = useColorScheme();

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
