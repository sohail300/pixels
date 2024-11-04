import BottomSheetComponent from "@/components/BottomSheet";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import Photos from "@/components/Photos";
import { BottomSheetContext } from "@/context/BottomSheetContext";
import { useContext } from "react";
import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExplorePage() {
  const { showBottomSheet, setShowBottomSheet, name, url } =
    useContext(BottomSheetContext);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Photos />
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
