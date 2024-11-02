import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

const Profile = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        <Text style={{ color: "white" }}>Nested Profile Page</Text>
        <Link href="/Policy">
          <Text
            style={{
              backgroundColor: "white",
              padding: 10,
              width: "50%",
              textAlign: "center",
              borderRadius: 4,
              marginTop: 20,
            }}
          >
            Policy Page
          </Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
