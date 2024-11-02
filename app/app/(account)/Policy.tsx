import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Policy = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        <Text style={{ color: "white" }}>Policy Page</Text>
      </View>
    </SafeAreaView>
  );
};

export default Policy;
