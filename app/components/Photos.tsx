import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import React from "react";
import ParallaxScrollView from "./ParallaxScrollView";
import Card from "./Card";
import useWallpaper from "@/hooks/useWallpaper";
import { Colors } from "@/constants/Colors";
import SpiltView from "./SpiltView";
import logo from "../assets/images/pixels.png";

const Photos = () => {
  const width = Dimensions.get("window").width;

  return (
    <View style={{ flex: 1 }}>
      <ParallaxScrollView
        headerImage={
          <Image source={logo} style={{ width: width, height: 240 }} />
        }
        headerBackgroundColor={{
          dark: `${Colors.brand.blackBackgroundColor}`,
          light: "white",
        }}
      >
        <SpiltView />
      </ParallaxScrollView>
    </View>
  );
};

export default Photos;
