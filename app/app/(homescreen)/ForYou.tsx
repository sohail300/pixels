import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Liked from "../foryou/Liked";
import Suggested from "../foryou/Suggested";
import Library from "../foryou/Library";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className=" flex">
        <View className=" bg-white rounded-full">
          <Text className=" color-white">For You</Text>
        </View>
      </View>
      <Tab.Navigator>
        <Tab.Screen name="suggested" component={Suggested} />
        <Tab.Screen name="liked" component={Liked} />
        <Tab.Screen name="library" component={Library} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
