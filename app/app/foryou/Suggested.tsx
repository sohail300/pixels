import { SafeAreaView, Text, StyleSheet, useColorScheme } from "react-native";
import React from "react";
import SpiltView from "@/components/SpiltView";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { ThemedView } from "@/components/ThemedView";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";

const Suggested = () => {
  const theme = useColorScheme();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <ThemedView
          style={{
            ...styles.content,
            backgroundColor:
              theme === "dark"
                ? DarkTheme.colors.background
                : DefaultTheme.colors.background,
          }}
        >
          <SpiltView />
        </ThemedView>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default Suggested;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
    gap: 16,
    overflow: "hidden",
  },
});
