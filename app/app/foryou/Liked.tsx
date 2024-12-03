import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  useColorScheme,
} from "react-native";
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
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useSelector } from "react-redux";

const Liked = () => {
  const colorTheme =
    useSelector((state) => state.theme.data) || useColorScheme();

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const [liked, setLiked] = useState(false);
  const [wallpaper1] = useWallpaper();

  return (
    <SafeAreaView
      style={{
        backgroundColor:
          colorTheme === "dark"
            ? DarkTheme.colors.background
            : DefaultTheme.colors.background,
      }}
    >
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
            <Text
              style={{
                ...styles.emptyStateText,
                color:
                  colorTheme === "dark"
                    ? DarkTheme.colors.text
                    : DefaultTheme.colors.text,
              }}
            >
              No favourites found!
            </Text>
            <FontAwesome
              name="heart"
              size={80}
              color={Colors.brand.accentColor}
              style={styles.icon}
            />
          </View>
        )}

        <Text
          style={{
            ...styles.text,
            color:
              colorTheme === "dark"
                ? DarkTheme.colors.text
                : DefaultTheme.colors.text,
          }}
        >
          Suggested for you!
        </Text>
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
    textAlign: "center",
    marginVertical: 16,
  },
  icon: {
    textAlign: "center",
  },
});
