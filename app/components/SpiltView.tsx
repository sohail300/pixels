import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import useWallpaper from "@/hooks/useWallpaper";
import Card from "./Card";

const SpiltView = () => {
  const [wallpaper1, wallpaper2] = useWallpaper();

  return (
    <View style={[styles.container, styles.cardContainer]}>
      <View style={styles.columnContainer}>
        <FlatList
          data={wallpaper1}
          renderItem={({ item }) => <Card uri={item.link} name={item.name} />}
          keyExtractor={(item) => String(item.id)}
          scrollEnabled={false}
        />
      </View>
      <View style={styles.columnContainer}>
        <View style={{ marginTop: 48 }}></View>
        <FlatList
          data={wallpaper2}
          renderItem={({ item }) => <Card uri={item.link} name={item.name} />}
          keyExtractor={(item) => String(item.id)}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
};

export default SpiltView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  columnContainer: {
    flex: 1,
    width: "100%",
  },
  cardContainer: {
    gap: 16,
  },
});
