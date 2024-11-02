import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Profile"
        options={{
          headerShown: true,
          headerBackVisible: true,
          headerBackTitle: "Go Back",
          headerTitle: "Account",
        }}
      />
      <Stack.Screen
        name="Policy"
        options={{
          headerShown: true,
          headerBackTitle: "Go Back",
          headerTitle: "Account",
        }}
      />
    </Stack>
  );
}
