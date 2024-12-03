import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  useColorScheme,
} from "react-native";
import React from "react";
import version1 from "../assets/images/v1.png";
import version2 from "../assets/images/v2.png";
import version3 from "../assets/images/v3.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { changeTheme } from "@/redux/ThemeSlice";
import { useDispatch } from "react-redux";

const Preferences = () => {
  const colorTheme =
    useSelector((state) => state.theme.data) || useColorScheme();

  const tempTheme = useColorScheme();

  const dispatch = useDispatch();

  return (
    <SafeAreaView>
      <Text
        style={{
          fontSize: 24,
          color:
            colorTheme === "dark"
              ? DarkTheme.colors.text
              : DefaultTheme.colors.text,
          fontWeight: "bold",
        }}
      >
        Preferences
      </Text>
      <Text
        style={{
          fontSize: 16,
          color:
            colorTheme === "dark"
              ? DarkTheme.colors.text
              : DefaultTheme.colors.text,
          marginVertical: 4,
        }}
      >
        Theme
      </Text>
      <View style={styles.buttonContainer}>
        <Pressable
          style={{
            ...styles.button,
            backgroundColor:
              colorTheme === "dark"
                ? DarkTheme.colors.text
                : DefaultTheme.colors.text,
          }}
          onPress={() => {
            dispatch(changeTheme(tempTheme));
          }}
        >
          <Text
            style={{
              ...styles.buttonText,
              color:
                colorTheme === "dark"
                  ? DefaultTheme.colors.text
                  : DarkTheme.colors.text,
            }}
          >
            System
          </Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            dispatch(changeTheme("light"));
          }}
        >
          <Text
            style={{
              ...styles.buttonText,
              color:
                colorTheme === "dark"
                  ? DarkTheme.colors.text
                  : DefaultTheme.colors.text,
            }}
          >
            Light
          </Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            dispatch(changeTheme("dark"));
          }}
        >
          <Text
            style={{
              ...styles.buttonText,
              color:
                colorTheme === "dark"
                  ? DarkTheme.colors.text
                  : DefaultTheme.colors.text,
            }}
          >
            Dark
          </Text>
        </Pressable>
      </View>

      <View style={{ marginTop: 24 }} />

      <Text
        style={{
          fontSize: 16,
          color:
            colorTheme === "dark"
              ? DarkTheme.colors.text
              : DefaultTheme.colors.text,
          marginVertical: 4,
        }}
      >
        App Icon
      </Text>
      <View style={styles.iconContainer}>
        <Image
          source={version1}
          style={{
            width: 80,
            height: 80,
            borderRadius: 16,
            ...styles.selectedIcon,
            borderColor:
              colorTheme === "dark"
                ? DarkTheme.colors.text
                : DefaultTheme.colors.text,
          }}
        />
        <Image
          source={version2}
          style={{ width: 80, height: 80, borderRadius: 16 }}
        />
        <Image
          source={version3}
          style={{ width: 80, height: 80, borderRadius: 16 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Preferences;

const styles = StyleSheet.create({
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    borderRadius: 12,
    borderColor: "#aaa",
    borderWidth: 1,
    padding: 16,
    width: "30%",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selectedIcon: {
    borderWidth: 4,
  },
});
