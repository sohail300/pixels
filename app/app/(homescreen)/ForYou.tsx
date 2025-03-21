import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Liked from "../foryou/Liked";
import Suggested from "../foryou/Suggested";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  useColorScheme,
} from "react-native";
import logo from "../../assets/images/logo.png";
import user from "../../assets/images/user.jpg";
import { Colors } from "@/constants/Colors";
import { useContext, useEffect, useMemo, useState } from "react";
import { BottomSheetContext } from "@/context/BottomSheetContext";
import BottomSheetComponent from "@/components/BottomSheet";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { supabase } from "../../lib/supabase";
import { Session } from "@supabase/supabase-js";

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  const [session, setSession] = useState<Session | null>(null);

  const screenWidth = Dimensions.get("window").width;
  const tabWidth = screenWidth / 2;

  const themeState = useSelector((state) => state.theme);
  const systemColorScheme = useColorScheme();

  const colorTheme = useMemo(() => {
    return themeState.data === "system" ? systemColorScheme : themeState.data;
  }, [themeState.data, systemColorScheme]);

  const { showBottomSheet, setShowBottomSheet, name, url } =
    useContext(BottomSheetContext);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          colorTheme === "dark" ? Colors.dark.card : Colors.light.card,
      }}
    >
      <View
        style={{
          ...styles.header,
          backgroundColor:
            colorTheme === "dark" ? Colors.dark.card : Colors.light.card,
        }}
      >
        <Image source={logo} style={styles.logoImage} />

        <View style={styles.userContainer}>
          <View style={styles.userInfo}>
            <Text
              style={{
                fontSize: 16,
                color:
                  colorTheme === "dark" ? Colors.dark.text : Colors.light.text,
              }}
            >
              {session?.user?.user_metadata?.full_name
                ? `Hello ${
                    session?.user?.user_metadata?.full_name.split(" ")[0]
                  }!`
                : "Hello User!"}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color:
                  colorTheme === "dark" ? Colors.dark.text : Colors.light.text,
              }}
            >
              Welcome to Pixels
            </Text>
          </View>
          {session?.user?.user_metadata?.avatar_url ? (
            <View>
              <Image
                source={{ uri: session?.user?.user_metadata?.avatar_url }}
                style={styles.userImage}
              />
            </View>
          ) : (
            <Image source={user} style={styles.userImage} />
          )}
        </View>
      </View>
      <View style={styles.tabContainer}>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              width: "100%",
              backgroundColor:
                colorTheme === "dark" ? Colors.dark.card : Colors.light.card,
            },
            tabBarItemStyle: {
              width: tabWidth,
              padding: 0,
            },
            tabBarLabelStyle: {
              fontSize: 14,
              textTransform: "capitalize",
              width: "100%",
              color:
                colorTheme === "dark" ? Colors.dark.text : Colors.light.text,
            },
            tabBarIndicatorStyle: {
              height: 4,
              backgroundColor: Colors.light.accent,
            },
          }}
        >
          <Tab.Screen name="suggested" component={Suggested} />
          <Tab.Screen name="liked" component={Liked} />
        </Tab.Navigator>
      </View>

      {showBottomSheet && (
        <BottomSheetComponent
          close={() => setShowBottomSheet(false)}
          name={name}
          url={url}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  logoImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  userInfo: {
    flexDirection: "column",
    alignItems: "flex-end",
    paddingHorizontal: 8,
  },
  userImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  tabContainer: {
    flex: 1,
    width: "100%",
  },
});
