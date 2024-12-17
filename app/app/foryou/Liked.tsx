import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  useColorScheme,
} from "react-native";
import React, { useMemo, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Colors } from "@/constants/Colors";
import Animated, { useAnimatedRef } from "react-native-reanimated";
import useWallpaper from "@/hooks/useWallpaper";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import LikedCard from "@/components/LikedCard";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useSelector } from "react-redux";

const Liked = () => {
  const themeState = useSelector((state) => state.theme);
  const systemColorScheme = useColorScheme();

  const colorTheme = useMemo(() => {
    return themeState.data === "system" ? systemColorScheme : themeState.data;
  }, [themeState.data, systemColorScheme]);

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const [liked, setLiked] = useState(false);
  const [wallpaper1] = useWallpaper();

  return (
    <SafeAreaView
      style={{
        height: "100%",
        backgroundColor:
          colorTheme === "dark"
            ? Colors.dark.background
            : Colors.light.background,
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
                  colorTheme === "dark" ? Colors.dark.text : Colors.light.text,
              }}
            >
              No favourites found!
            </Text>
            <FontAwesome
              name="heart"
              size={80}
              color={Colors.light.accent}
              style={styles.icon}
            />
          </View>
        )}
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
