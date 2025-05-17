import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  Animated,
  SafeAreaView,
  useColorScheme,
} from "react-native";
import React, { useEffect, useMemo, useState, useRef } from "react";
import SpiltView from "./SpiltView";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import CarouselComponent from "./CarouselComponent";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { BlurView } from "expo-blur";
import { useSelector } from "react-redux";
import { BACKEND_URL, LIMIT, SKIP } from "@/lib/config";

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 70;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const HomePage = () => {
  const themeState = useSelector((state) => state.theme);
  const systemColorScheme = useColorScheme();
  const scrollY = useRef(new Animated.Value(0)).current;

  const theme = useMemo(() => {
    return themeState.data === "system" ? systemColorScheme : themeState.data;
  }, [themeState.data, systemColorScheme]);

  const [wallpaper1, setWallpaper1] = useState([]);
  const [wallpaper2, setWallpaper2] = useState([]);
  const [limit, setLimit] = useState(LIMIT);
  const [skip, setSkip] = useState(SKIP);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.5, 0],
    extrapolate: "clamp",
  });

  const searchBarTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -25],
    extrapolate: "clamp",
  });

  async function getWallpapers() {
    try {
      const response = await fetch(
        `${BACKEND_URL}/explore?skip=${skip}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      if (data.length !== 0) {
        const midpoint = Math.ceil(data.length / 2);
        setWallpaper1((prev) => [...prev, ...data.slice(0, midpoint)]);
        setWallpaper2((prev) => [...prev, ...data.slice(midpoint)]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error fetching wallpapers:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setSkip(page * limit);
  }, [page]);

  useEffect(() => {
    getWallpapers();
  }, []);

  const renderHeaderContent = () => (
    <Animated.View
      style={[
        styles.headerContent,
        {
          height: headerHeight,
          opacity: headerOpacity,
        },
      ]}
    >
      <CarouselComponent />
    </Animated.View>
  );

  const renderSearchBar = () => (
    <Animated.View
      style={[
        styles.searchBarContainer,
        {
          transform: [{ translateY: searchBarTranslateY }],
          backgroundColor:
            theme === "dark"
              ? "rgba(30, 30, 30, 0.9)"
              : "rgba(255, 255, 255, 0.9)",
        },
      ]}
    >
      <BlurView
        intensity={80}
        tint={theme === "dark" ? "dark" : "light"}
        style={styles.blurContainer}
      >
        <View style={styles.searchInputContainer}>
          <AntDesign
            name="search1"
            size={20}
            color={theme === "dark" ? Colors.dark.accent : "#666"}
          />
          <TextInput
            placeholder="Search wallpapers..."
            style={{
              ...styles.searchInput,
              color: theme === "dark" ? Colors.dark.text : Colors.light.text,
            }}
            placeholderTextColor={theme === "dark" ? "#aaa" : "#888"}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <Feather
              name="x"
              size={20}
              color={theme === "dark" ? "#aaa" : "#888"}
              onPress={() => setSearchQuery("")}
              style={styles.clearButton}
            />
          )}
        </View>
      </BlurView>
    </Animated.View>
  );

  const renderFloatingMenu = () => (
    <View style={styles.floatingMenuContainer}>
      <View
        style={[
          styles.floatingMenu,
          {
            backgroundColor:
              theme === "dark"
                ? "rgba(30, 30, 30, 0.85)"
                : "rgba(255, 255, 255, 0.85)",
          },
        ]}
      >
        <BlurView
          intensity={80}
          tint={theme === "dark" ? "dark" : "light"}
          style={styles.menuBlur}
        >
          <View style={styles.menuIconsContainer}>
            <Ionicons
              name="home"
              size={26}
              color={
                theme === "dark" ? Colors.dark.accent : Colors.light.accent
              }
              style={styles.menuIcon}
            />
            <Ionicons
              name="grid-outline"
              size={24}
              color={theme === "dark" ? "#aaa" : "#777"}
              style={styles.menuIcon}
            />
            <Ionicons
              name="bookmark-outline"
              size={24}
              color={theme === "dark" ? "#aaa" : "#777"}
              style={styles.menuIcon}
            />
            <Ionicons
              name="settings-outline"
              size={24}
              color={theme === "dark" ? "#aaa" : "#777"}
              style={styles.menuIcon}
            />
          </View>
        </BlurView>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          theme === "dark" ? Colors.dark.background : Colors.light.background,
      }}
    >
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      {renderHeaderContent()}
      {renderSearchBar()}

      <Animated.ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: HEADER_MAX_HEIGHT,
          paddingBottom: 80,
        }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        onScrollEndDrag={() => {
          if (!loading) {
            setLoading(true);
            getWallpapers();
          }
        }}
      >
        <View
          style={{
            ...styles.content,
            backgroundColor:
              theme === "dark"
                ? Colors.dark.background
                : Colors.light.background,
          }}
        >
          <View style={styles.wallpapersContainer}>
            <SpiltView
              wallpaper1={wallpaper1}
              wallpaper2={wallpaper2}
              loading={loading}
            />
          </View>
        </View>
      </Animated.ScrollView>

      {/* {renderFloatingMenu()} */}
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  headerContent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
    zIndex: 1,
  },
  searchBarContainer: {
    position: "absolute",
    top: HEADER_MIN_HEIGHT - 10,
    left: 20,
    right: 20,
    height: 50,
    borderRadius: 25,
    zIndex: 2,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  blurContainer: {
    flex: 1,
    borderRadius: 25,
    overflow: "hidden",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: "100%",
  },
  searchInput: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 15,
  },
  clearButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    marginLeft: 4,
  },
  categoriesScroll: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1.5,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
  },
  wallpapersContainer: {
    flex: 1,
  },
  floatingMenuContainer: {
    position: "absolute",
    bottom: 25,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 3,
  },
  floatingMenu: {
    width: "75%",
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  menuBlur: {
    flex: 1,
    borderRadius: 30,
  },
  menuIconsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  menuIcon: {
    paddingHorizontal: 10,
  },
});
