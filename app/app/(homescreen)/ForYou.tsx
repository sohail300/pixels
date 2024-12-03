import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Liked from "../foryou/Liked";
import Suggested from "../foryou/Suggested";
import Library from "../foryou/Library";
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
import { useContext, useMemo } from "react";
import { BottomSheetContext } from "@/context/BottomSheetContext";
import BottomSheetComponent from "@/components/BottomSheet";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useSelector } from "react-redux";

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  const screenWidth = Dimensions.get("window").width;
  const tabWidth = screenWidth / 2;

  const themeState = useSelector((state) => state.theme);
  const systemColorScheme = useColorScheme();

  const colorTheme = useMemo(() => {
    return themeState.data === "system" ? systemColorScheme : themeState.data;
  }, [themeState.data, systemColorScheme]);

  const { showBottomSheet, setShowBottomSheet, name, url } =
    useContext(BottomSheetContext);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          colorTheme === "dark"
            ? DarkTheme.colors.background
            : DefaultTheme.colors.background,
      }}
    >
      <View
        style={{
          ...styles.header,
          backgroundColor:
            colorTheme === "dark"
              ? DarkTheme.colors.background
              : DefaultTheme.colors.background,
        }}
      >
        <Image source={logo} style={styles.logoImage} />

        <View style={styles.userContainer}>
          <View style={styles.userInfo}>
            <Text
              style={{
                fontSize: 16,
                color:
                  colorTheme === "dark"
                    ? DarkTheme.colors.text
                    : DefaultTheme.colors.text,
              }}
            >
              Hello User!
            </Text>
            <Text
              style={{
                fontSize: 14,
                color:
                  colorTheme === "dark"
                    ? DarkTheme.colors.text
                    : DefaultTheme.colors.text,
              }}
            >
              Welcome to Pixels
            </Text>
          </View>

          <Image source={user} style={styles.userImage} />
        </View>
      </View>
      <View style={styles.tabContainer}>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              width: "100%",
              backgroundColor:
                colorTheme === "dark"
                  ? DarkTheme.colors.background
                  : DefaultTheme.colors.background,
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
                colorTheme === "dark"
                  ? DarkTheme.colors.text
                  : DefaultTheme.colors.text,
            },
            tabBarIndicatorStyle: {
              height: 4,
              backgroundColor: Colors.brand.accentColor,
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
