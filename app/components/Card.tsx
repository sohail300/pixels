import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import React, { useContext, useMemo } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/Colors";
import BottomSheetComponent from "./BottomSheet";
import { BottomSheetContext } from "@/context/BottomSheetContext";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "@/lib/config";

const Card = ({
  id,
  uri,
  name,
  hasLiked,
  downloads,
  likes,
  categories,
  uploaderName,
}) => {
  const themeState = useSelector((state) => state.theme);
  const systemColorScheme = useColorScheme();

  const theme = useMemo(() => {
    return themeState.data === "system" ? systemColorScheme : themeState.data;
  }, [themeState.data, systemColorScheme]);

  const {
    setShowBottomSheet,
    setUrl,
    setName,
    setDownloads,
    setLikes,
    setCategories,
    setUploaderName,
    setHasLiked,
    setId,
  } = useContext(BottomSheetContext);

  const handlePress = () => {
    setShowBottomSheet(true);
    setUrl(uri);
    setName(name);
    setDownloads(downloads);
    setLikes(likes);
    setCategories(categories);
    setUploaderName(uploaderName); // Replace with actual uploader name if available
    setHasLiked(hasLiked);
    setId(id);
  };

  const handleLike = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/like/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data) {
        setHasLiked((prev) => !prev);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Image source={{ uri }} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.overlay}>
        <Text style={styles.text}>{name}</Text>
        <TouchableOpacity onPress={handleLike}>
          {hasLiked ? (
            <AntDesign name="hearto" size={28} color={Colors.light.accent} />
          ) : (
            <AntDesign name="heart" size={24} color="#FD1D1D" />
          )}
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
