import { View, Text, StyleSheet, useColorScheme, Image } from "react-native";
import React, { useMemo, useState } from "react";
import { Colors } from "@/constants/Colors";
import Animated, { useAnimatedRef } from "react-native-reanimated";
import useWallpaper from "@/hooks/useWallpaper";
import { FlatList } from "react-native-gesture-handler";
import LikedCard from "@/components/LikedCard";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

const Liked = () => {
  const themeState = useSelector((state) => state.theme);
  const systemColorScheme = useColorScheme();

  const colorTheme = useMemo(() => {
    return themeState.data === "system" ? systemColorScheme : themeState.data;
  }, [themeState.data, systemColorScheme]);

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const [liked, setLiked] = useState(false);
  const [wallpaper1] = useWallpaper();

  const bgColor =
    colorTheme === "dark" ? Colors.dark.background : Colors.light.background;
  const textColor =
    colorTheme === "dark" ? Colors.dark.text : Colors.light.text;

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {liked ? (
        <FlatList
          data={wallpaper1}
          contentContainerStyle={styles.likedList}
          renderItem={({ item }) => (
            <LikedCard uri={item.link} name={item.name} />
          )}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyStateContainer}>
          <View style={styles.emptyStateContent}>
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor:
                    colorTheme === "dark" ? "#2A2A2A" : "#F5F5F5",
                },
              ]}
            >
              <Ionicons name="heart" size={40} color={Colors.light.accent} />
            </View>
            <Text style={[styles.emptyStateTitle, { color: textColor }]}>
              No favorites yet
            </Text>
            <Text style={[styles.emptyStateSubtitle, { color: textColor }]}>
              Tap the heart icon on any wallpaper to add it to your favorites
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default Liked;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  likedList: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 30,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyStateContent: {
    alignItems: "center",
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  emptyStateSubtitle: {
    fontSize: 16,
    textAlign: "center",
    opacity: 0.7,
    lineHeight: 22,
  },
});
