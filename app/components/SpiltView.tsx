import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React from "react";
import Card from "./Card";
import { BUCKET_URL } from "@/lib/config";
import { Colors } from "@/constants/Colors";

const SpiltView = ({
  wallpaper1,
  wallpaper2,
  loading,
}: {
  readonly wallpaper1: any[];
  readonly wallpaper2: any[];
  readonly loading?: boolean;
}) => {
  return (
    <View style={[styles.container, styles.cardContainer]}>
      <View style={styles.columnContainer}>
        <FlatList
          data={wallpaper1}
          renderItem={({ item }) => (
            <Card
              id={item.id}
              uri={`${BUCKET_URL}${item.image}`}
              name={item.name}
              hasLiked={item.has_liked}
              downloads={item.downloads}
              likes={item.likes}
              categories={item.categories}
              uploaderName={item.uploader_name}
              uploaderImage={item.uploader_image}
            />
          )}
          keyExtractor={(item) => String(item.id)}
          scrollEnabled={false}
        />
      </View>
      <View style={styles.columnContainer}>
        <View style={{ marginTop: 48 }}></View>
        <FlatList
          data={wallpaper2}
          renderItem={({ item }) => (
            <Card
              id={item.id}
              uri={`${BUCKET_URL}${item.image}`}
              name={item.name}
              hasLiked={item.has_liked}
              downloads={item.downloads}
              likes={item.likes}
              categories={item.categories}
              uploaderName={item.uploader_name}
              uploaderImage={item.uploader_image}
            />
          )}
          keyExtractor={(item) => String(item.id)}
          scrollEnabled={false}
          ListFooterComponent={
            loading && wallpaper1.length > 0 ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color={Colors.light.accent} />
              </View>
            ) : null
          }
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
  loadingContainer: {
    padding: 16,
    alignItems: "center",
  },
  loadingText: {
    fontSize: 14,
    color: "#666",
  },
});
