import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  useColorScheme,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Colors } from "@/constants/Colors";

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

  // GoogleSignin.configure({
  //   scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  //   webClientId:
  //     "1026701954227-r8npbs4m7vte67o1m1u3h2c9clgj3qoe.apps.googleusercontent.com",
  // });

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
        <Pressable
          style={{
            borderRadius: 8,
            height: 48,
            width: "100%",
            justifyContent: "center",
            borderWidth: 2,
            borderColor:
              theme === "dark" ? Colors.dark.text : Colors.light.text,
          }}
        >
          {/* <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={async () => {
              try {
                await GoogleSignin.hasPlayServices();
                const userInfo = await GoogleSignin.signIn();
                console.log(userInfo);
                if (userInfo?.data?.idToken) {
                  const { data, error } = await supabase.auth.signInWithIdToken(
                    {
                      provider: "google",
                      token: userInfo?.data.idToken,
                    }
                  );
                  console.log("1");
                  console.log(error, data);
                } else {
                  throw new Error("no ID token present!");
                }
              } catch (error: any) {
                if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                  console.log("user cancelled the login flow");
                } else if (error.code === statusCodes.IN_PROGRESS) {
                  console.log(
                    "operation (e.g. sign in) is in progress already"
                  );
                } else if (
                  error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
                ) {
                  console.log("play services not available or outdated");
                } else {
                  console.log(error);
                }
              }
            }}
          /> */}
        </Pressable>

        {session && session.user && <Text>{session.user.id}</Text>}
      </View>
    </View>
  );
};

export default Signin;
