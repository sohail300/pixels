import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import React from "react";
import logo from "../assets/images/pixels.png";
import version2 from "../assets/images/version2.png";
import version3 from "../assets/images/version3.png";
import version4 from "../assets/images/version4.png";
import { SafeAreaView } from "react-native-safe-area-context";

const Preferences = () => {
  return (
    <SafeAreaView>
      <Text style={{ fontSize: 24, color: "#fff", fontWeight: "bold" }}>
        Preferences
      </Text>
      <Text style={{ fontSize: 16, color: "#fff", marginVertical: 4 }}>
        Theme
      </Text>
      <View style={styles.buttonContainer}>
        <Pressable style={{ ...styles.button, ...styles.selectedButton }}>
          <Text style={{ ...styles.buttonText, ...styles.selectedText }}>
            System
          </Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Light</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Dark</Text>
        </Pressable>
      </View>

      <View style={{ marginTop: 24 }} />

      <Text style={{ fontSize: 16, color: "#fff", marginVertical: 4 }}>
        App Icon
      </Text>
      <View style={styles.iconContainer}>
        <Image
          source={logo}
          style={{
            width: 80,
            height: 80,
            borderRadius: 16,
            ...styles.selectedIcon,
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
        <Image
          source={version4}
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
    borderColor: "#333",
    borderWidth: 2,
    padding: 16,
    width: "30%",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  selectedButton: {
    backgroundColor: "#fff",
  },
  selectedText: {
    color: "#000",
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selectedIcon: {
    borderColor: "#fff",
    borderWidth: 4,
  },
});
