import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/Colors";
import { BottomSheetContext } from "@/context/BottomSheetContext";

const LikedCard = ({
  uri,
  name,
}: {
  readonly uri: string;
  readonly name: string;
}) => {
  const { setShowBottomSheet, setUrl, setName } =
    useContext(BottomSheetContext);

  const handlePress = () => {
    setShowBottomSheet(true);
    setUrl(uri);
    setName(name);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={handlePress}>
        <Image source={{ uri }} style={{ width: 300, height: 440 }} />
      </TouchableOpacity>
      <View style={styles.overlay}>
        <Text style={styles.text}>{name}</Text>
        <TouchableOpacity>
          <AntDesign name="hearto" size={28} color={Colors.light.accent} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LikedCard;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  card: {
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
    marginVertical: 12,
    marginHorizontal: 48,
    flex: 1,
  },
  text: {
    color: "white",
  },
});
