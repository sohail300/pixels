import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Liked from "../foryou/Liked";
import Suggested from "../foryou/Suggested";
import Library from "../foryou/Library";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import logo from "../../assets/images/pixels.png";
import user from "../../assets/images/user.jpg";
import { Colors } from "@/constants/Colors";
import { useContext } from "react";
import { BottomSheetContext } from "@/context/BottomSheetContext";
import BottomSheetComponent from "@/components/BottomSheet";

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  const screenWidth = Dimensions.get("window").width;
  const tabWidth = screenWidth / 2;

  const { showBottomSheet, setShowBottomSheet, name, url } =
    useContext(BottomSheetContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logoImage} />

        <View style={styles.userContainer}>
          <View style={styles.userInfo}>
            <Text style={styles.greeting}>Hello User!</Text>
            <Text style={styles.welcome}>Welcome to Pixels</Text>
          </View>

          <Image source={user} style={styles.userImage} />
        </View>
      </View>
      <View style={styles.tabContainer}>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              width: "100%",
              backgroundColor: Colors.brand.grayBackgroundColor,
            },
            tabBarItemStyle: {
              width: tabWidth,
              padding: 0,
            },
            tabBarLabelStyle: {
              fontSize: 14,
              textTransform: "capitalize",
              width: "100%",
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
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: Colors.brand.grayBackgroundColor,
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
  greeting: {
    color: "white",
    fontSize: 16,
  },
  welcome: {
    color: "white",
    fontSize: 14,
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
