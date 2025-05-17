import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  SafeAreaView,
  useColorScheme,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import SpiltView from "./SpiltView";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import CarouselComponent from "./CarouselComponent";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/Colors";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { BACKEND_URL, LIMIT, SKIP } from "@/lib/config";

const HomePage = () => {
  const themeState = useSelector((state) => state.theme);
  const systemColorScheme = useColorScheme();

  const theme = useMemo(() => {
    return themeState.data === "system" ? systemColorScheme : themeState.data;
  }, [themeState.data, systemColorScheme]);

  const [wallpaper1, setWallpaper1] = useState([]);
  const [wallpaper2, setWallpaper2] = useState([]);
  const [limit, setLimit] = useState(LIMIT);
  const [skip, setSkip] = useState(SKIP);
  const [page, setPage] = useState(0);

  const [loading, setLoading] = useState(true);

  async function getWallpapers() {
    try {
      const response = await fetch(
        `${BACKEND_URL}/explore?skip=${skip}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      if (data.length !== 0) {
        for (let i = 0; i < data.length; i++) {
          console.log(data[i].name);
        }

        const midpoint = Math.ceil(data.length / 2);
        console.log(midpoint);
        setWallpaper1((prev) => [...prev, ...data.slice(0, midpoint)]);
        setWallpaper2((prev) => [...prev, ...data.slice(midpoint)]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error fetching wallpapers:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setSkip(page * limit);
  }, [page]);

  useEffect(() => {
    getWallpapers();
  }, []);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "transparent" }}
      onScrollEndDrag={() => {
        setLoading(true);
        getWallpapers();
      }}
    >
      <CarouselComponent />
      <View
        style={{
          ...styles.content,
          backgroundColor:
            theme === "dark" ? Colors.dark.background : Colors.light.background,
        }}
      >
        <View
          style={{
            backgroundColor: theme === "dark" ? "#333" : "#fff",
            borderColor:
              theme === "dark" ? Colors.dark.text : Colors.light.text,
            borderWidth: 1,
            marginHorizontal: 48,
            marginVertical: 24,
            padding: 16,
            borderRadius: 8,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
          }}
        >
          <AntDesign
            name="search1"
            size={24}
            color={`${theme === "dark" ? Colors.dark.accent : "#333"}`}
          />
          <TextInput
            placeholder="Search"
            style={{
              color: theme === "dark" ? Colors.dark.text : Colors.light.text,
              width: "100%",
            }}
            placeholderTextColor={"#aaa"}
          />
        </View>
        <SpiltView
          wallpaper1={wallpaper1}
          wallpaper2={wallpaper2}
          loading={loading}
        />
      </View>
    </ScrollView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 16,
    gap: 16,
    overflow: "hidden",
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    marginTop: -24,
  },
});
