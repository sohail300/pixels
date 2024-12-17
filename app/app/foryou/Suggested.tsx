import { SafeAreaView, StyleSheet, useColorScheme } from "react-native";
import React, { useMemo } from "react";
import SpiltView from "@/components/SpiltView";
import Animated, { useAnimatedRef } from "react-native-reanimated";
import { ThemedView } from "@/components/ThemedView";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Colors } from "@/constants/Colors";

const Suggested = () => {
  const themeState = useSelector((state) => state.theme);
  const systemColorScheme = useColorScheme();

  const colorTheme = useMemo(() => {
    return themeState.data === "system" ? systemColorScheme : themeState.data;
  }, [themeState.data, systemColorScheme]);

  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <ThemedView
          style={{
            ...styles.content,
            backgroundColor:
              colorTheme === "dark"
                ? Colors.dark.background
                : Colors.light.background,
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
