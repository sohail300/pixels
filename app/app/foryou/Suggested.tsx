import { SafeAreaView, Text, StyleSheet } from "react-native";
import React from "react";
import SpiltView from "@/components/SpiltView";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { ThemedView } from "@/components/ThemedView";

const Suggested = () => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <ThemedView style={styles.content}>
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
