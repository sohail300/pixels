import { AppState } from "react-native";
import { View, Text, Pressable, useColorScheme } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";
import { useSelector } from "react-redux";
import { Colors } from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const Signin = () => {
  const [session, setSession] = useState<Session | null>(null);
  const themeState = useSelector((state) => state.theme);
  const systemColorScheme = useColorScheme();

  const theme = useMemo(() => {
    return themeState.data === "system" ? systemColorScheme : themeState.data;
  }, [themeState.data, systemColorScheme]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  GoogleSignin.configure({
    scopes: ["https://www.googleapis.com/auth/userinfo.profile"],
    webClientId:
      "1026701954227-r8npbs4m7vte67o1m1u3h2c9clgj3qoe.apps.googleusercontent.com",
  });

  return (
    <View>
      <Text
        style={{
          fontSize: 24,
          color: theme === "dark" ? Colors.dark.text : Colors.light.text,
          fontWeight: "bold",
        }}
      >
        Signin
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: theme === "dark" ? Colors.dark.text : Colors.light.text,
          marginVertical: 2,
        }}
      >
        Signin to save your data
      </Text>
      <View
        style={{
          backgroundColor:
            theme === "dark" ? Colors.dark.card : Colors.light.card,
          borderRadius: 12,
          padding: 24,
          marginVertical: 8,
          marginTop: 16,
        }}
      >
        <TouchableOpacity
          style={{
            height: 48,
            width: "100%",
            justifyContent: "center",
          }}
          onPress={async () => {
            try {
              await GoogleSignin.hasPlayServices();
              const userInfo = await GoogleSignin.signIn();
              console.log(userInfo);
              if (userInfo?.data?.idToken) {
                const { data, error } = await supabase.auth.signInWithIdToken({
                  provider: "google",
                  token: userInfo?.data.idToken,
                });
                console.log("logging");
                console.log(error, data);
              } else {
                throw new Error("no ID token present!");
              }
            } catch (error: any) {
              if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log("user cancelled the login flow");
              } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log("operation (e.g. sign in) is in progress already");
              } else if (
                error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
              ) {
                console.log("play services not available or outdated");
              } else {
                console.log(error);
              }
            }
          }}
        >
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signin;
