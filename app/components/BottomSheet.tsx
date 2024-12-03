import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Button,
  useColorScheme,
  ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Colors } from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { formatDate } from "@/lib/date";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";

export default function BottomSheetComponent({
  close,
  url,
  name,
}: {
  close: () => void;
  url: string;
  name: string;
}) {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  const theme = useSelector((state) => state.theme.data) || useColorScheme();

  const width = Dimensions.get("window").width;

  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  const callback = (downloadProgress) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    console.log(`Download Progress: ${progress}`);
  };

  async function download(name, url) {
    try {
      const filePath = FileSystem.documentDirectory + `${name}.png`;
      const downloadResumable = FileSystem.createDownloadResumable(
        url,
        filePath,
        {},
        callback
      );

      const result = await downloadResumable.downloadAsync();
      getAlbums(filePath);

      console.log("Finished downloading to ", result);
    } catch (error) {
      console.log(error);
    }
  }

  async function getAlbums(filePath) {
    if (permissionResponse.status !== "granted") {
      await requestPermission();
    }

    try {
      const asset = await MediaLibrary.createAssetAsync(filePath);
      const album = await MediaLibrary.getAlbumAsync("Download/Pixels");
      if (album == null) {
        await MediaLibrary.createAlbumAsync("Download/Pixels", asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }
      ToastAndroid.show(
        "File downloaded at Pictures/Download/Pixels",
        ToastAndroid.LONG
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <BottomSheet
        ref={bottomSheetRef}
        handleIndicatorStyle={{ display: "none" }}
        handleStyle={{
          height: 0,
          padding: 0,
          margin: 0,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          backgroundColor: "white",
        }}
        snapPoints={["80%"]}
        enablePanDownToClose={true}
        onClose={close}
        overDragResistanceFactor={0}
      >
        <BottomSheetView
          style={{
            ...styles.contentContainer,
            backgroundColor:
              theme === "dark"
                ? DarkTheme.colors.background
                : DefaultTheme.colors.background,
          }}
        >
          <View style={styles.icon}>
            <TouchableOpacity>
              <AntDesign
                name="hearto"
                size={28}
                color={Colors.brand.accentColor}
              />
            </TouchableOpacity>
          </View>
          <Image
            source={{ uri: url }}
            style={{ width: width, height: 420, borderRadius: 16 }}
          />
          <Text
            style={{
              ...styles.text,
              color:
                theme === "dark"
                  ? DarkTheme.colors.text
                  : DefaultTheme.colors.text,
            }}
          >
            {name}
          </Text>
          <TouchableOpacity onPress={() => download(name, url)}>
            <View
              style={{
                ...styles.button,
                backgroundColor:
                  theme === "dark" ? DarkTheme.colors.primary : "#2c2c2c",
              }}
            >
              <Ionicons
                name="image-outline"
                size={32}
                color={`${
                  theme === "dark"
                    ? DarkTheme.colors.background
                    : DefaultTheme.colors.primary
                }`}
              />
              <Text
                style={{
                  ...styles.buttonText,
                  color:
                    theme === "dark"
                      ? DarkTheme.colors.background
                      : DefaultTheme.colors.primary,
                }}
              >
                Get Wallpaper
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "80%",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name="cards-outline"
                size={24}
                color={
                  theme === "dark"
                    ? DarkTheme.colors.text
                    : DefaultTheme.colors.text
                }
                style={{ marginRight: 8 }}
              />
              <Text
                style={{
                  color:
                    theme === "dark"
                      ? DarkTheme.colors.text
                      : DefaultTheme.colors.text,
                }}
              >
                Category: Nature
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color:
                    theme === "dark"
                      ? DarkTheme.colors.text
                      : DefaultTheme.colors.text,
                }}
              >
                50+ Downloads
              </Text>
              <Feather
                name="download"
                size={20}
                color={
                  theme === "dark"
                    ? DarkTheme.colors.text
                    : DefaultTheme.colors.text
                }
                style={{ marginLeft: 8 }}
              />
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 0,
    alignItems: "center",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    gap: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    padding: 12,
    borderRadius: 8,
    width: 300,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  icon: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 10,
    borderRadius: 50,
    padding: 8,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
});
