import BottomSheetComponent from "@/components/BottomSheet";
import { useState } from "react";
import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExplorePage() {
  const [popup, setPopup] = useState(false);
  console.log("popup", popup);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ color: "white" }}>Explore Page</Text>
        <Button title="Show Popup" onPress={() => setPopup(true)} />
        <Text>{popup}</Text>
        {popup && <BottomSheetComponent close={() => setPopup(false)} />}
      </View>
    </SafeAreaView>
  );
}
