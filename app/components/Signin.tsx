import {
  View,
  Text,
  useColorScheme,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
// import {
//   GoogleSignin,
//   statusCodes,
// } from "@react-native-google-signin/google-signin";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";
import { useSelector } from "react-redux";
import { Colors } from "@/constants/Colors";
import { RootState } from "@/redux/store";

const Signin = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);
  const themeState = useSelector((state: RootState) => state.theme);
  const systemColorScheme = useColorScheme();

  const theme = useMemo(() => {
    return themeState.data === "system" ? systemColorScheme : themeState.data;
  }, [themeState.data, systemColorScheme]);

  const isDark = theme === "dark";

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

  // const handleGoogleSignIn = async () => {
  //   setLoading(true);
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     if (userInfo?.data?.idToken) {
  //       const { data, error } = await supabase.auth.signInWithIdToken({
  //         provider: "google",
  //         token: userInfo?.data.idToken,
  //       });
  //       if (error) {
  //         console.error("Error signing in with Google:", error);
  //       }
  //     } else {
  //       throw new Error("No ID token present!");
  //     }
  //   } catch (error: any) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       console.log("User cancelled the login flow");
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       console.log("Operation is in progress already");
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       console.log("Play services not available or outdated");
  //     } else {
  //       console.error("Google sign-in error:", error);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <View>
      <Text
        style={{
          fontSize: 24,
          color: isDark ? Colors.dark.text : Colors.light.text,
          fontWeight: "700",
          marginBottom: 8,
        }}
      >
        Sign in
      </Text>

      <View
        style={{
          backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
          borderRadius: 16,
          padding: 24,
          marginTop: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: isDark ? 0.3 : 0.1,
          shadowRadius: 8,
          elevation: 3,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: isDark ? Colors.dark.text : Colors.light.text,
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          Sign in to unlock all features
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: "#FFFFFF",
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 8,
            width: "100%",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: "#DADCE0",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 1,
          }}
          // onPress={handleGoogleSignIn}
          // disabled={loading}
        >
          <Image
            source={{
              uri: "https://developers.google.com/identity/images/g-logo.png",
            }}
            style={{
              width: 20,
              height: 20,
              marginRight: 12,
            }}
            resizeMode="contain"
          />
          <Text
            style={{
              color: "#3C4043",
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            {loading ? "Signing in..." : "Sign in with Google"}
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 12,
            color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)",
            marginTop: 24,
            textAlign: "center",
          }}
        >
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </Text>
      </View>
    </View>
  );
};

export default Signin;
