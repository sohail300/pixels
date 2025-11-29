import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ToastAndroid,
  Animated,
  StatusBar,
  Platform,
  Appearance,
  useColorScheme,
  TouchableWithoutFeedback,
} from "react-native";
import { BlurView } from "expo-blur";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
  useContext,
} from "react";
import { Colors } from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useSelector, useDispatch } from "react-redux";
import { BACKEND_URL } from "@/lib/config";
import { LinearGradient } from "expo-linear-gradient";
import { SessionContext } from "@/context/SessionContext";
import { RootState } from "@/redux/store";
import { toggleLike as toggleLikeAction } from "@/redux/LikedWallpapersSlice";

interface BottomSheetComponentProps {
  readonly close: () => void;
  readonly id?: string;
  readonly name: string;
  readonly url: string;
  readonly downloads?: number;
  readonly likes?: number;
  readonly uploaderName?: string;
  readonly uploaderImage?: string;
  readonly hasLiked?: boolean;
  readonly categories?: string[];
  readonly visible?: boolean;
}

export default function BottomSheetComponent({
  close,
  id,
  name,
  url,
  downloads,
  likes,
  uploaderName,
  uploaderImage,
  hasLiked,
  categories,
  visible = true,
}: BottomSheetComponentProps) {
  // refs
  const bottomSheetRef = useRef<BottomSheet>(null);
  const themeState = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();
  const systemColorScheme =
    Platform.OS === "ios" ? Appearance.getColorScheme() : useColorScheme();

  // animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [likeAnimation] = useState(new Animated.Value(1));
  const [liked, setLiked] = useState(hasLiked ?? false);
  const [likeCount, setLikeCount] = useState(likes ?? 0);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const isClosingRef = useRef(false);
  const isOpeningRef = useRef(false);
  const previousVisibleRef = useRef<boolean | undefined>(undefined);

  const theme = useMemo(() => {
    return themeState.data === "system" ? systemColorScheme : themeState.data;
  }, [themeState.data, systemColorScheme]);

  const { session } = useContext(SessionContext);

  const isDark = theme === "dark";
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    // Skip if this is the initial render and visible is false
    if (previousVisibleRef.current === undefined) {
      previousVisibleRef.current = visible;
      if (!visible) {
        fadeAnim.setValue(0);
        scaleAnim.setValue(0.95);
      } else {
        // If visible on mount, open immediately
        setTimeout(() => {
          bottomSheetRef.current?.snapToIndex(0);
        }, 100);
      }
      return;
    }

    // Only handle state changes
    if (previousVisibleRef.current === visible) return;

    if (visible && !previousVisibleRef.current) {
      // Opening: reset states and start animation
      isClosingRef.current = false;
      isOpeningRef.current = true;
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.95);

      // Start backdrop animation first
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Open the BottomSheet programmatically after a short delay
      // This ensures the backdrop animation has started
      const openTimeoutId = setTimeout(() => {
        bottomSheetRef.current?.snapToIndex(0);
        // Keep opening flag true for longer to prevent onChange from closing
        setTimeout(() => {
          isOpeningRef.current = false;
        }, 500);
      }, 100);

      return () => {
        clearTimeout(openTimeoutId);
      };
    } else if (!visible && previousVisibleRef.current) {
      // Closing: close the sheet and reset animations
      bottomSheetRef.current?.close();
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.95);
      isClosingRef.current = false;
      isOpeningRef.current = false;
    }

    previousVisibleRef.current = visible;
  }, [visible]);

  const handleClose = useCallback(() => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;

    // Animate backdrop fade out, then close
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      close();
      isClosingRef.current = false;
    });
  }, [fadeAnim, close]);

  const handleSheetChange = useCallback(
    (index: number) => {
      // Ignore changes during opening or if already closing
      if (isOpeningRef.current || isClosingRef.current) return;

      // When sheet is closed (index === -1) and we were visible, close properly
      if (index === -1) {
        // Only close if we're actually visible (user dragged it down)
        if (!visible) return;

        // User dragged the sheet down, so close it
        isClosingRef.current = true;

        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }).start(() => {
          close();
          isClosingRef.current = false;
        });
      }
    },
    [fadeAnim, close, visible]
  );

  const toggleLike = () => {
    // Check if user is logged in
    if (!session && !session?.access_token) {
      ToastAndroid.show("You must be logged in", ToastAndroid.SHORT);
      return;
    }

    // Animate heart press
    Animated.sequence([
      Animated.timing(likeAnimation, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(likeAnimation, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    // Update like status
    const newLikedState = !liked;
    setLiked(newLikedState);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));

    // Update global state
    if (id) {
      dispatch(toggleLikeAction(String(id)));
    }

    // Update like on backend
    updateLikeOnServer();
  };

  const updateLikeOnServer = async () => {
    try {
      await fetch(`${BACKEND_URL}/like/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log("Failed to update like:", error);
    }
  };

  const downloadCallback = (
    downloadProgress: FileSystem.DownloadProgressData
  ) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    setDownloadProgress(progress);
  };

  async function download(name: string, url: string) {
    try {
      setIsDownloading(true);

      const filePath = FileSystem.documentDirectory + `${name}.png`;
      const downloadResumable = FileSystem.createDownloadResumable(
        url,
        filePath,
        {},
        downloadCallback
      );

      const result = await downloadResumable.downloadAsync();
      await saveToGallery(filePath);

      // Update download count on server
      const response = await fetch(`${BACKEND_URL}/download/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setIsDownloading(false);
      setDownloadProgress(0);
    } catch (error) {
      setIsDownloading(false);
      console.log(error);
      ToastAndroid.show("Download failed", ToastAndroid.SHORT);
    }
  }

  async function saveToGallery(filePath: string) {
    if (permissionResponse?.status !== "granted") {
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
        "Wallpaper saved to Pictures/Download/Pixels",
        ToastAndroid.LONG
      );
    } catch (error) {
      console.log(error);
    }
  }

  const snapPoints = useMemo(() => ["85%"], []);

  function capitalize(name: any): import("react").ReactNode {
    if (typeof name !== "string" || !name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  return (
    <View
      style={[
        StyleSheet.absoluteFillObject,
        {
          zIndex: visible ? 9999 : -1,
          elevation: visible ? 9999 : -1,
          opacity: visible ? 1 : 0,
        },
      ]}
      pointerEvents={visible ? "box-none" : "none"}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <TouchableWithoutFeedback onPress={handleClose}>
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            styles.backdrop,
            { opacity: fadeAnim },
          ]}
          pointerEvents={visible ? "auto" : "none"}
        >
          <BlurView intensity={80} style={StyleSheet.absoluteFillObject} />
        </Animated.View>
      </TouchableWithoutFeedback>

      <BottomSheet
        ref={bottomSheetRef}
        handleIndicatorStyle={{
          backgroundColor: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
        }}
        handleStyle={{
          backgroundColor: "transparent",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          zIndex: 10,
          elevation: 10,
          height: 0,
          padding: 0,
          margin: 0,
        }}
        backgroundStyle={{
          backgroundColor: isDark ? "#121212" : "#ffffff",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        enableOverDrag={false}
        onChange={handleSheetChange}
        onClose={handleClose}
        index={-1}
        animateOnMount={false}
      >
        <BottomSheetView
          style={[
            styles.contentContainer,
            {
              backgroundColor: isDark ? "#121212" : "#ffffff",
            },
          ]}
        >
          <Animated.View
            style={[
              styles.imageContainer,
              { transform: [{ scale: scaleAnim }] },
            ]}
          >
            <Image
              source={{ uri: url }}
              style={styles.image}
              resizeMode="cover"
            />

            <LinearGradient
              colors={[
                "rgba(0,0,0,0.7)",
                "transparent",
                "transparent",
                "rgba(0,0,0,0.5)",
              ]}
              style={styles.imageGradient}
            />

            <View style={styles.imageOverlay}>
              <Animated.View
                style={[
                  styles.likeButton,
                  { transform: [{ scale: likeAnimation }] },
                ]}
              >
                <TouchableOpacity
                  onPress={toggleLike}
                  style={styles.iconButton}
                >
                  <AntDesign
                    name={liked ? "heart" : "hearto"}
                    size={24}
                    color={liked ? "#FD1D1D" : "#ffffff"}
                  />
                </TouchableOpacity>
              </Animated.View>
            </View>
          </Animated.View>

          <View style={styles.contentSection}>
            <View style={styles.headerSection}>
              <View style={styles.titleContainer}>
                <Text
                  style={[
                    styles.title,
                    { color: isDark ? "#ffffff" : "#000000" },
                  ]}
                >
                  {name ? capitalize(name) : name}
                </Text>

                <Text style={[{ color: isDark ? "#aaaaaa" : "#666666" }]}>
                  Uploaded by:{" "}
                </Text>

                <View style={styles.uploaderInfo}>
                  {uploaderImage && (
                    <View style={styles.uploaderAvatar}>
                      <Image
                        source={{ uri: uploaderImage }}
                        style={styles.uploaderImage}
                      />
                    </View>
                  )}
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={[
                        styles.uploaderName,
                        { color: isDark ? "#ffffff" : "#000000" },
                      ]}
                    >
                      {uploaderName || "Unknown"}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.statsSection}>
                <View style={styles.statItem}>
                  <Feather
                    name="download"
                    size={18}
                    color={isDark ? "#aaaaaa" : "#666666"}
                  />
                  <Text
                    style={[
                      styles.statText,
                      { color: isDark ? "#aaaaaa" : "#666666" },
                    ]}
                  >
                    {downloads ?? 0} downloads
                  </Text>
                </View>

                <View style={styles.statItem}>
                  <AntDesign
                    name="heart"
                    size={18}
                    color={isDark ? "#aaaaaa" : "#666666"}
                  />
                  <Text
                    style={[
                      styles.statText,
                      { color: isDark ? "#aaaaaa" : "#666666" },
                    ]}
                  >
                    {likeCount} likes
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.categoriesSection}>
              <MaterialCommunityIcons
                name="tag-multiple-outline"
                size={18}
                color={isDark ? "#aaaaaa" : "#666666"}
                style={{ marginRight: 8 }}
              />
              <View style={styles.categoryChips}>
                {categories &&
                  (showAllCategories ? categories : categories.slice(0, 2)).map(
                    (category, index) => (
                      <View key={index} style={styles.categoryChip}>
                        <Text style={styles.categoryText}>{category}</Text>
                      </View>
                    )
                  )}
                {categories && categories.length > 2 && !showAllCategories && (
                  <TouchableOpacity
                    onPress={() => setShowAllCategories(true)}
                    style={styles.categoryChip}
                  >
                    <Text style={styles.categoryText}>
                      +{categories.length - 2}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <TouchableOpacity
              onPress={() => download(name, url)}
              disabled={isDownloading}
              style={[
                styles.downloadButton,
                isDownloading
                  ? { backgroundColor: isDark ? "#2a2a2a" : "#e0e0e0" }
                  : {
                      backgroundColor: isDark
                        ? Colors.dark.accent
                        : Colors.light.accent,
                    },
              ]}
            >
              {isDownloading ? (
                <View style={styles.progressContainer}>
                  <View
                    style={[
                      styles.progressBar,
                      { width: `${downloadProgress * 100}%` },
                    ]}
                  />
                  <Text style={styles.downloadBtnText}>
                    Downloading... {Math.round(downloadProgress * 100)}%
                  </Text>
                </View>
              ) : (
                <>
                  <Ionicons
                    name="cloud-download-outline"
                    size={24}
                    color="#2a2a2a"
                  />
                  <Text style={styles.downloadBtnText}>Download Wallpaper</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  contentContainer: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  imageContainer: {
    width: "100%",
    height: 400,
    position: "relative",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  imageGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
  },
  imageOverlay: {
    position: "absolute",
    right: 0,
    padding: 16,
  },
  categoryChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryChip: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  likeButton: {
    alignSelf: "flex-start",
  },
  iconButton: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  contentSection: {
    paddingHorizontal: 20,
  },
  headerSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 12,
  },
  uploaderInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  uploaderAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  uploaderInitial: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  uploaderName: {
    fontSize: 16,
    fontWeight: "400",
  },
  uploaderImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  uploadTime: {
    fontSize: 12,
  },
  statsSection: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    gap: 8,
    marginBottom: 16,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statText: {
    marginLeft: 6,
    fontSize: 14,
  },
  categoriesSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 12,
  },
  categoryListText: {
    marginLeft: 6,
    fontSize: 14,
  },
  downloadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  downloadBtnText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2a2a2a",
    marginLeft: 12,
  },
  progressContainer: {
    width: "100%",
    height: 24,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  progressBar: {
    position: "absolute",
    left: 0,
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: 12,
  },
});
