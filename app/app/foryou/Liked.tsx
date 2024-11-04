import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import React, { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Colors } from "@/constants/Colors";
import SpiltView from "@/components/SpiltView";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { ThemedView } from "@/components/ThemedView";
import useWallpaper from "@/hooks/useWallpaper";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Card from "@/components/Card";
import LikedCard from "@/components/LikedCard";

const Liked = () => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const [liked, setLiked] = useState(true);
  const [wallpaper1] = useWallpaper();

  return (
    <SafeAreaView>
      <ScrollView>
        {liked ? (
          <FlatList
            style={{ marginTop: 16 }}
            scrollEnabled={false}
            data={wallpaper1}
            renderItem={({ item }) => (
              <LikedCard uri={item.link} name={item.name} />
            )}
            keyExtractor={(item) => String(item.id)}
          />
        ) : (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>No favourites found!</Text>
            <FontAwesome
              name="heart"
              size={80}
              color={Colors.brand.accentColor}
              style={styles.icon}
            />
          </View>
        )}

        <Text style={styles.text}>Suggested for you!</Text>
        <ThemedView style={styles.content}>
          <SpiltView />
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Liked;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 250,
    overflow: "hidden",
  },
  content: {
    flex: 1,
    padding: 16,
    gap: 16,
    overflow: "hidden",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 16,
  },
  emptyStateContainer: {
    width: "100%",
    marginVertical: 16,
    gap: 8,
    alignSelf: "center",
  },
  emptyStateText: {
    color: "white",
    textAlign: "center",
    marginVertical: 16,
  },
  icon: {
    textAlign: "center",
  },
});
