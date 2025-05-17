import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  Dimensions,
  Animated,
} from "react-native";
import React, { useContext, useMemo, useRef, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/Colors";
import { BottomSheetContext } from "@/context/BottomSheetContext";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "@/lib/config";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

const Card = ({
  id,
  uri,
  name,
  hasLiked,
  downloads,
  likes,
  categories,
  uploaderName,
  uploaderImage,
}) => {
  const themeState = useSelector((state) => state.theme);
  const systemColorScheme = useColorScheme();
  const [liked, setLiked] = useState(hasLiked);
  const [pressed, setPressed] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const likeAnim = useRef(new Animated.Value(1)).current;

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
    setUploaderImage,
    setHasLiked,
    setId,
  } = useContext(BottomSheetContext);

  const handlePress = () => {
    // Card press animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Set bottom sheet data
    setShowBottomSheet(true);
    setUrl(uri);
    setName(name);
    setDownloads(downloads);
    setLikes(likes);
    setCategories(categories);
    setUploaderName(uploaderName);
    setUploaderImage(uploaderImage);
    setHasLiked(liked);
    setId(id);
  };

  const handleLike = async (event) => {
    // Stop event propagation to prevent triggering the card press
    event.stopPropagation();

    // Heart animation
    Animated.sequence([
      Animated.timing(likeAnim, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(likeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    // Toggle liked state
    setLiked(!liked);

    // Update on server
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
    } catch (error) {
      console.log(error);
      // Revert state if API fails
      setLiked(liked);
    }
  };

  function capitalize(name: any): import("react").ReactNode {
    if (typeof name !== "string" || !name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  // Display featured category if available
  const featuredCategory =
    categories && categories.length > 0 ? categories[0] : null;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handlePress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={styles.touchable}
    >
      <Animated.View
        style={[
          styles.container,
          { transform: [{ scale: scaleAnim }] },
          theme === "dark" ? styles.darkModeCard : {},
        ]}
      >
        <Image source={{ uri }} style={styles.image} />

        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.75)"]}
          style={styles.gradient}
        />

        <View style={styles.bottomContent}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.nameText}>
            {name ? capitalize(name) : name}
          </Text>

          <Animated.View style={{ transform: [{ scale: likeAnim }] }}>
            <TouchableOpacity
              onPress={handleLike}
              style={styles.likeButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <AntDesign
                name={liked ? "heart" : "hearto"}
                size={22}
                color={liked ? "#FD1D1D" : "#ffffff"}
              />
            </TouchableOpacity>
          </Animated.View>
        </View>

        {pressed && (
          <View style={styles.pressEffect}>
            <BlurView intensity={25} style={StyleSheet.absoluteFill} />
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default Card;

// Get screen width to calculate card dimensions
const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2; // Accounting for margins and gap

const styles = StyleSheet.create({
  touchable: {
    marginBottom: 16,
  },
  container: {
    width: cardWidth,
    height: cardWidth * 1.6, // Aspect ratio 3:5
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  darkModeCard: {
    shadowColor: "#333",
    shadowOpacity: 0.2,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "50%",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  bottomContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 12,
  },
  nameText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
    flex: 1,
    marginRight: 8,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  likeButton: {
    width: 32,
    height: 32,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  pressEffect: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 16,
  },
});
