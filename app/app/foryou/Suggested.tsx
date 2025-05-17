// Updated Suggested component
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  View,
  Text,
} from "react-native";
import React, { useMemo } from "react";
import SpiltView from "@/components/SpiltView";
import Animated, { useAnimatedRef } from "react-native-reanimated";
import { ThemedView } from "@/components/ThemedView";
import { useSelector } from "react-redux";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const Suggested = () => {
  const themeState = useSelector((state) => state.theme);
  const systemColorScheme = useColorScheme();

  const colorTheme = useMemo(() => {
    return themeState.data === "system" ? systemColorScheme : themeState.data;
  }, [themeState.data, systemColorScheme]);

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const bgColor =
    colorTheme === "dark" ? Colors.dark.background : Colors.light.background;
  const textColor =
    colorTheme === "dark" ? Colors.dark.text : Colors.light.text;

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <SpiltView />
      </Animated.ScrollView>
    </View>
  );
};

export default Suggested;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    height: 46,
    borderRadius: 23,
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchPlaceholder: {
    fontSize: 16,
    opacity: 0.6,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
