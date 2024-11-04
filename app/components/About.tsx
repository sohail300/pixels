import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const About = () => {
  return (
    <SafeAreaView>
      <Text style={{ fontSize: 24, color: "#fff", fontWeight: "bold" }}>
        About
      </Text>
      <Text style={styles.text}>Downloads</Text>
      <Text style={styles.text}>Privay Policy</Text>
      <Text style={styles.text}>Terms of Service</Text>
      <Text style={styles.text}>Licenses</Text>
      <View>
        <Text style={styles.text}>Version</Text>
        <Text style={styles.subtext}>1.3.0</Text>
      </View>
    </SafeAreaView>
  );
};

export default About;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    paddingVertical: 4,
    marginVertical: 4,
    fontWeight: "medium",
    color: "#fff",
  },
  subtext: {
    fontSize: 14,
    fontWeight: "light",
    color: "#fff",
    marginTop: -8,
  },
});
