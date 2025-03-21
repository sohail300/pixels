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
import React, { useMemo } from "react";
import SpiltView from "./SpiltView";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import CarouselComponent from "./CarouselComponent";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/Colors";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useSelector } from "react-redux";

const HomePage = () => {
  const themeState = useSelector((state) => state.theme);
  const systemColorScheme = useColorScheme();

  const theme = useMemo(() => {
    return themeState.data === "system" ? systemColorScheme : themeState.data;
  }, [themeState.data, systemColorScheme]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "transparent" }}>
      {/* <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}> */}
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
        <SpiltView />
      </View>
      {/* </KeyboardAvoidingView> */}
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
