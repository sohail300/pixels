import { Tabs } from "expo-router";
import React, { useMemo, useEffect } from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useSelector } from "react-redux";
import { Colors } from "@/constants/Colors";
import * as SystemUI from "expo-system-ui";
import { RootState } from "@/redux/store";

export default function TabLayout() {
  const themeState = useSelector((state: RootState) => state.theme);
  const systemColorScheme = useColorScheme();

  const colorTheme = useMemo(() => {
    return themeState.data === "system" ? systemColorScheme : themeState.data;
  }, [themeState.data, systemColorScheme]);

  const backgroundColor =
    colorTheme === "dark" ? Colors.dark.background : Colors.light.background;

  // 👇 Sync Android navigation bar color with tab bar color
  useEffect(() => {
    SystemUI.setBackgroundColorAsync(backgroundColor);
  }, [backgroundColor, colorTheme]);

  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor:
          colorTheme === "dark" ? Colors.dark.text : Colors.light.text,
        tabBarItemStyle: {
          backgroundColor,
        },
        tabBarStyle: {
          backgroundColor,
          height: 60,
          paddingTop: 10,
          paddingBottom: 10,
          borderColor: "transparent",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 10,
          zIndex: 10,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "globe" : "globe-outline"}
              color={
                focused && colorTheme === "dark" ? Colors.light.accent : color
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ForYou"
        options={{
          title: "For You",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "star" : "star-outline"}
              color={
                focused && colorTheme === "dark" ? Colors.light.accent : color
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Account"
        options={{
          title: "Account",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={
                focused && colorTheme === "dark" ? Colors.light.accent : color
              }
            />
          ),
        }}
      />
    </Tabs>
  );
}
