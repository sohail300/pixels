import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  useColorScheme,
} from "react-native";
import React, { useContext, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";
import { useSelector } from "react-redux";
import { Colors } from "@/constants/Colors";
import { supabase } from "../lib/supabase";
import { SessionContext } from "@/context/SessionContext";

const About = () => {
  const themeState = useSelector((state) => state.theme);
  const systemColorScheme = useColorScheme();

  const { session } = useContext(SessionContext);

  const theme = useMemo(() => {
    return themeState.data === "system" ? systemColorScheme : themeState.data;
  }, [themeState.data, systemColorScheme]);

  const handleRedirect = async (url) => {
    let result = await WebBrowser.openBrowserAsync(url);
    console.log(result);
  };

  return (
    <SafeAreaView>
      <Text
        style={{
          fontSize: 24,
          color: theme === "dark" ? Colors.dark.text : Colors.light.text,
          fontWeight: "bold",
        }}
      >
        About
      </Text>
      <Text
        style={{
          ...styles.text,
          color: theme === "dark" ? Colors.dark.text : Colors.light.text,
        }}
        onPress={() =>
          handleRedirect("https://pixels.heysohail.me/privacy-policy")
        }
      >
        Privay Policy
      </Text>
      <Text
        style={{
          ...styles.text,
          color: theme === "dark" ? Colors.dark.text : Colors.light.text,
        }}
        onPress={() =>
          handleRedirect("https://pixels.heysohail.me/terms-of-services")
        }
      >
        Terms of Service
      </Text>
      <View>
        <Text
          style={{
            ...styles.text,
            color: theme === "dark" ? Colors.dark.text : Colors.light.text,
          }}
        >
          Version
        </Text>
        <Text
          style={{
            ...styles.subtext,
            color: theme === "dark" ? Colors.dark.text : Colors.light.text,
          }}
        >
          1.0.0
        </Text>
      </View>
      {session && (
        <View>
          <Text
            style={{
              ...styles.text,
              color: theme === "dark" ? Colors.dark.text : Colors.light.text,
            }}
            onPress={() => {
              console.log("logout");
              supabase.auth.signOut();
            }}
          >
            Logout
          </Text>
        </View>
      )}
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
  },
  subtext: {
    fontSize: 14,
    fontWeight: "light",
    marginTop: -8,
  },
});
