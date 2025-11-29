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
import { useSelector, useDispatch } from "react-redux";
import { BACKEND_URL, LIMIT, SKIP } from "@/lib/config";
import { RootState } from "@/redux/store";
import { store } from "@/redux/store";
import { setLikedIds } from "@/redux/LikedWallpapersSlice";

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 70;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const HomePage = () => {
  const themeState = useSelector((state: RootState) => state.theme);
  const systemColorScheme = useColorScheme();
  const scrollY = useRef(new Animated.Value(0)).current;
  const leftGetsExtraRef = useRef(true); // Track which side should get extra item
  const existingIdsRef = useRef(new Set()); // Track all existing IDs to prevent duplicates

  const theme = useMemo(() => {
    return themeState.data === "system" ? systemColorScheme : themeState.data;
  }, [themeState.data, systemColorScheme]);

  const [wallpaper1, setWallpaper1] = useState<any[]>([]);
  const [wallpaper2, setWallpaper2] = useState<any[]>([]);
  const [limit, setLimit] = useState(LIMIT);
  const [skip, setSkip] = useState(SKIP);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [hasReachedSearchEnd, setHasReachedSearchEnd] = useState(false);
  const searchPageRef = useRef(0);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const likedWallpapers = useSelector(
    (state: RootState) => state.likedWallpapers
  );

  // Update has_liked for existing wallpapers when global state changes
  useEffect(() => {
    if (likedWallpapers.lastUpdated) {
      const likedIds = new Set(likedWallpapers.likedIds);
      setWallpaper1((prev) =>
        prev.map((item: any) => ({
          ...item,
          has_liked: likedIds.has(String(item.id)),
        }))
      );
      setWallpaper2((prev) =>
        prev.map((item: any) => ({
          ...item,
          has_liked: likedIds.has(String(item.id)),
        }))
      );
    }
  }, [likedWallpapers.lastUpdated]);

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

  async function getWallpapers(resetArrays = false, skipOverride?: number) {
    try {
      const currentSkip = skipOverride !== undefined ? skipOverride : page * limit;
      const response = await fetch(
        `${BACKEND_URL}/explore?skip=${currentSkip}&limit=${limit}`,
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

      // Check if we've reached the end (empty response or fewer items than limit)
      if (data.length === 0 || data.length < limit) {
        setHasReachedEnd(true);
      }

      if (data.length !== 0) {
        // Filter out duplicates based on ID before adding to state
        const newItems = data.filter(
          (item: any) => !existingIdsRef.current.has(item.id)
        );

        if (newItems.length > 0) {
          // Add new IDs to the ref
          newItems.forEach((item: any) => existingIdsRef.current.add(item.id));

          // Update has_liked based on global state and sync global state
          const likedIds = new Set(store.getState().likedWallpapers.likedIds);
          const newlyLikedIds: string[] = [];
          newItems.forEach((item: any) => {
            const itemId = String(item.id);
            if (item.has_liked && !likedIds.has(itemId)) {
              newlyLikedIds.push(itemId);
            }
            item.has_liked = likedIds.has(itemId) || item.has_liked;
          });
          // Update global state with newly liked items from API
          if (newlyLikedIds.length > 0) {
            dispatch(setLikedIds(newlyLikedIds));
          }

          // Alternate which side gets the extra item to maintain balance
          const midpoint = leftGetsExtraRef.current
            ? Math.ceil(newItems.length / 2)
            : Math.floor(newItems.length / 2);

          if (resetArrays) {
            // Reset arrays for fresh start
            setWallpaper1(newItems.slice(0, midpoint));
            setWallpaper2(newItems.slice(midpoint));
          } else {
            // Update both arrays by appending
            setWallpaper1((prev: any[]) => [
              ...prev,
              ...newItems.slice(0, midpoint),
            ]);
            setWallpaper2((prev: any[]) => [
              ...prev,
              ...newItems.slice(midpoint),
            ]);
          }

          // Alternate for next fetch
          leftGetsExtraRef.current = !leftGetsExtraRef.current;
        }

        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error fetching wallpapers:", error);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  }

  async function searchWallpapers(query: string, isLoadMore = false) {
    try {
      const currentPage = isLoadMore ? searchPageRef.current : 0;
      const skip = currentPage * limit;

      const response = await fetch(
        `${BACKEND_URL}/search?skip=${skip}&limit=${limit}&query=${encodeURIComponent(
          query
        )}`,
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

      // Check if we've reached the end (empty response or fewer items than limit)
      if (data.length === 0 || data.length < limit) {
        setHasReachedSearchEnd(true);
      }

      if (data.length !== 0) {
        // Filter out duplicates based on ID before adding to state
        const newItems = data.filter(
          (item: any) => !existingIdsRef.current.has(item.id)
        );

        if (newItems.length > 0) {
          // Add new IDs to the ref
          newItems.forEach((item: any) => existingIdsRef.current.add(item.id));

          // Update has_liked based on global state and sync global state
          const likedIds = new Set(store.getState().likedWallpapers.likedIds);
          const newlyLikedIds: string[] = [];
          newItems.forEach((item: any) => {
            const itemId = String(item.id);
            if (item.has_liked && !likedIds.has(itemId)) {
              newlyLikedIds.push(itemId);
            }
            item.has_liked = likedIds.has(itemId) || item.has_liked;
          });
          // Update global state with newly liked items from API
          if (newlyLikedIds.length > 0) {
            dispatch(setLikedIds(newlyLikedIds));
          }

          if (isLoadMore) {
            // Alternate which side gets the extra item to maintain balance
            const midpoint = leftGetsExtraRef.current
              ? Math.ceil(newItems.length / 2)
              : Math.floor(newItems.length / 2);

            // Update both arrays
            setWallpaper1((prev: any[]) => [
              ...prev,
              ...newItems.slice(0, midpoint),
            ]);
            setWallpaper2((prev: any[]) => [
              ...prev,
              ...newItems.slice(midpoint),
            ]);

            // Alternate for next fetch
            leftGetsExtraRef.current = !leftGetsExtraRef.current;
          } else {
            // Reset arrays for new search
            setHasReachedSearchEnd(false);
            const midpoint = Math.ceil(newItems.length / 2);
            setWallpaper1(newItems.slice(0, midpoint) as any[]);
            setWallpaper2(newItems.slice(midpoint) as any[]);
            leftGetsExtraRef.current = true;
            searchPageRef.current = 0;
          }

          if (isLoadMore) {
            searchPageRef.current += 1;
          }
        }
      } else if (!isLoadMore) {
        // No results for new search
        setWallpaper1([]);
        setWallpaper2([]);
      }
    } catch (error) {
      console.error("Error searching wallpapers:", error);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  }

  useEffect(() => {
    setSkip(page * limit);
  }, [page]);

  useEffect(() => {
    getWallpapers();
  }, []);

  // Handle search query changes with debouncing
  useEffect(() => {
    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (searchQuery.trim().length === 0) {
      // Clear search - reset to explore mode
      setIsSearchMode(false);
      setHasReachedEnd(false);
      setHasReachedSearchEnd(false);
      existingIdsRef.current.clear();
      searchPageRef.current = 0;
      setPage(0);
      leftGetsExtraRef.current = true; // Reset the alternating ref
      setLoading(true);
      // Reset arrays and fetch fresh wallpapers
      setWallpaper1([]);
      setWallpaper2([]);
      // Call getWallpapers with skip=0 to ensure we start from the beginning
      getWallpapers(true, 0); // Pass true to reset arrays and skip=0
      return;
    }

    // Set search mode
    setIsSearchMode(true);
    setLoading(true);
    existingIdsRef.current.clear();
    searchPageRef.current = 0;

    // Debounce search - wait 500ms after user stops typing
    searchTimeoutRef.current = setTimeout(() => {
      searchWallpapers(searchQuery.trim(), false);
    }, 500);

    // Cleanup timeout on unmount or query change
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

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
              onPress={() => {
                setSearchQuery("");
                setIsSearchMode(false);
              }}
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
          {
            useNativeDriver: false,
            listener: (event: any) => {
              const { contentOffset, contentSize, layoutMeasurement } =
                event.nativeEvent;
              const scrollPosition = contentOffset.y + layoutMeasurement.height;
              const threshold = contentSize.height - 500; // Load more when 500px from bottom

              // Only load more if near bottom and not already loading and not reached end
              if (
                scrollPosition >= threshold &&
                !isLoadingMore &&
                !loading &&
                wallpaper1.length > 0 &&
                !(isSearchMode ? hasReachedSearchEnd : hasReachedEnd)
              ) {
                setIsLoadingMore(true);
                if (isSearchMode && searchQuery.trim().length > 0) {
                  searchWallpapers(searchQuery.trim(), true);
                } else {
                  getWallpapers();
                }
              }
            },
          }
        )}
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
              loading={isLoadingMore}
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
