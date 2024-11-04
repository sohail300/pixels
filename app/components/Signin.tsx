import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Signin = () => {
  return (
    <SafeAreaView>
      <Text
        style={{
          fontSize: 24,
          color: "#fff",
          fontWeight: "bold",
        }}
      >
        Signin
      </Text>
      <Text style={{ fontSize: 16, color: "#fff", marginVertical: 2 }}>
        Signin to save your data
      </Text>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}>
          <View style={styles.buttonContent}>
            <Image
              source={{
                uri: "https://cdn.iconscout.com/icon/free/png-256/google-160-189824.png",
              }}
              style={styles.googleIcon}
            />
            <Text style={styles.buttonText}>Sign In</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Signin;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 24,
    marginVertical: 8,
  },
  button: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    height: 48,
    width: "100%",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  googleIcon: {
    width: 18,
    height: 18,
  },
  buttonText: {
    color: "#3C4043",
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.25,
  },
});
