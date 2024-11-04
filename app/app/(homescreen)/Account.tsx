import About from "@/components/About";
import Preferences from "@/components/Preferences";
import Signin from "@/components/Signin";
import { View, Text, Button, Pressable, StyleSheet, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AccountPage() {
  return (
    <SafeAreaView style={{ marginHorizontal: 12 }}>
      <ScrollView
        persistentScrollbar={false}
        showsVerticalScrollIndicator={false}
      >
        <Signin />
        <Preferences />
        <About />
      </ScrollView>
    </SafeAreaView>
  );
}
