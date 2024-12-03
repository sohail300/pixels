import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useSelector } from "react-redux";

export default function TabLayout() {
  const colorTheme =
    useSelector((state) => state.theme.data) || useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor:
          colorTheme === "dark"
            ? DarkTheme.colors.primary
            : DefaultTheme.colors.text,
        tabBarItemStyle: {
          backgroundColor:
            colorTheme === "dark"
              ? DarkTheme.colors.background
              : DefaultTheme.colors.background,
        },
        tabBarStyle: {
          backgroundColor:
            colorTheme === "dark"
              ? DarkTheme.colors.background
              : DefaultTheme.colors.background,
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
              color={color}
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
              color={color}
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
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
