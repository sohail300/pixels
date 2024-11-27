import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import React, { useContext } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/Colors";
import BottomSheetComponent from "./BottomSheet";
import { BottomSheetContext } from "@/context/BottomSheetContext";

const Card = ({ uri, name }) => {
  const theme = useColorScheme();

  const { setShowBottomSheet, setUrl, setName } =
    useContext(BottomSheetContext);

  const handlePress = () => {
    setShowBottomSheet(true);
    setUrl(uri);
    setName(name);
  };

  const handleLike = () => {
    console.log("Image liked!");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Image source={{ uri }} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.overlay}>
        <Text style={styles.text}>{name}</Text>
        <TouchableOpacity onPress={handleLike}>
          <AntDesign name="hearto" size={28} color={Colors.brand.accentColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
  },
  image: {
    width: 170,
    height: 280,
  },
  text: {
    color: "white",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
});
