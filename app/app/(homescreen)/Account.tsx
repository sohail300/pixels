import { Link } from "expo-router";
import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AccountPage() {
  return (
    <SafeAreaView>
      <Text style={{ color: "white" }}>Account Page</Text>
      <Link href={"/Profile"}>
        <Text
          style={{
            backgroundColor: "white",
            width: "50%",
            margin: "auto",
            borderRadius: 4,
            marginTop: 20,
          }}
        >
          Profile Page
        </Text>
      </Link>
    </SafeAreaView>
  );
}
