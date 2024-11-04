import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  SafeAreaView,
} from "react-native";
import React from "react";
import SpiltView from "./SpiltView";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import CarouselComponent from "./CarouselComponent";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/Colors";

const Photos = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "transparent" }}>
      <CarouselComponent />
      <View style={styles.content}>
        <View
          style={{
            backgroundColor: "#333",
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
          <AntDesign name="search1" size={24} color="white" />
          <TextInput
            placeholder="Search"
            style={{ color: "white", width: "100%" }}
            placeholderTextColor={"#aaa"}
          />
        </View>
        <SpiltView />
      </View>
    </ScrollView>
  );
};

export default Photos;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 16,
    gap: 16,
    overflow: "hidden",
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    backgroundColor: Colors.dark.background,
    marginTop: -20,
  },
});
