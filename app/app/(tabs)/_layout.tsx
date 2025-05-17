import { Tabs } from "expo-router";
import React, { useMemo } from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useSelector } from "react-redux";
import { Colors } from "@/constants/Colors";

export default function TabLayout() {
  const themeState = useSelector((state) => state.theme);
  const systemColorScheme = useColorScheme();

  const colorTheme = useMemo(() => {
    return themeState.data === "system" ? systemColorScheme : themeState.data;
  }, [themeState.data, systemColorScheme]);

  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor:
          colorTheme === "dark" ? Colors.dark.text : Colors.light.text,
        tabBarItemStyle: {
          backgroundColor:
            colorTheme === "dark"
              ? Colors.dark.background
              : Colors.light.background,
        },
        tabBarStyle: {
          backgroundColor:
            colorTheme === "dark"
              ? Colors.dark.background
              : Colors.light.background,
          height: 60,
          paddingTop: 10,
          paddingBottom: 10,
          borderColor: "transparent",
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
