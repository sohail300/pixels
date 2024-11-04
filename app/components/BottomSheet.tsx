import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef } from "react";
import { Colors } from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function BottomSheetComponent({
  close,
  url,
  name,
}: {
  close: () => void;
  url: string;
  name: string;
}) {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const width = Dimensions.get("window").width;

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        handleIndicatorStyle={{ display: "none" }}
        handleStyle={{
          height: 0,
          padding: 0,
          margin: 0,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          backgroundColor: "white",
        }}
        snapPoints={["80%"]}
        enablePanDownToClose={true}
        onClose={close}
        overDragResistanceFactor={0}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.icon}>
            <TouchableOpacity>
              <AntDesign
                name="hearto"
                size={28}
                color={Colors.brand.accentColor}
              />
            </TouchableOpacity>
          </View>
          <Image
            source={{ uri: url }}
            style={{ width: width, height: 420, borderRadius: 16 }}
          />
          <Text style={styles.text}>{name}</Text>
          <TouchableOpacity>
            <View style={styles.button}>
              <Ionicons name="image-outline" size={32} color="black" />
              <Text style={styles.buttonText}>Get Wallpaper</Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "80%",
            }}
          >
            <Text style={{ color: "white" }}>Category: Nature</Text>
            <Text style={{ color: "white" }}>50+ Downloads</Text>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 0,
    alignItems: "center",
    backgroundColor: Colors.brand.blackBackgroundColor,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    gap: 20,
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: Colors.brand.accentColor,
    padding: 12,
    borderRadius: 8,
    width: 300,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  buttonText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  icon: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 10,
    borderRadius: 50,
    padding: 8,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
});
