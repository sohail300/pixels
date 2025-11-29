// Updated Suggested component
import { StyleSheet, useColorScheme, View, Text, Animated } from "react-native";
import React, { useMemo, useState, useEffect, useRef } from "react";
import SpiltView from "@/components/SpiltView";
import { useSelector, useDispatch } from "react-redux";
import { Colors } from "@/constants/Colors";
import { BACKEND_URL, LIMIT } from "@/lib/config";
import { RootState } from "@/redux/store";
import { store } from "@/redux/store";
import { setLikedIds } from "@/redux/LikedWallpapersSlice";

const Suggested = () => {
  const themeState = useSelector((state: RootState) => state.theme);
  const systemColorScheme = useColorScheme();

  const colorTheme = useMemo(() => {
    return themeState.data === "system" ? systemColorScheme : themeState.data;
  }, [themeState.data, systemColorScheme]);

  const scrollY = useRef(new Animated.Value(0)).current;
  const bgColor =
    colorTheme === "dark" ? Colors.dark.background : Colors.light.background;
  const textColor =
    colorTheme === "dark" ? Colors.dark.text : Colors.light.text;

  // State for wallpapers
  const [wallpaper1, setWallpaper1] = useState<any[]>([]);
  const [wallpaper2, setWallpaper2] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [limit] = useState(LIMIT);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);

  // Refs for tracking
  const leftGetsExtraRef = useRef(true);
  const existingIdsRef = useRef(new Set());
  const likedWallpapers = useSelector(
    (state: RootState) => state.likedWallpapers
  );
  const dispatch = useDispatch();

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

  // Function to fetch suggested wallpapers
  async function getSuggestedWallpapers() {
    try {
      const currentSkip = page * limit;
      const response = await fetch(
        `${BACKEND_URL}/suggested?skip=${currentSkip}&limit=${limit}`,
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

          // Update both arrays
          setWallpaper1((prev: any[]) => [
            ...prev,
            ...newItems.slice(0, midpoint),
          ]);
          setWallpaper2((prev) => [...prev, ...newItems.slice(midpoint)]);

          // Alternate for next fetch
          leftGetsExtraRef.current = !leftGetsExtraRef.current;
        }

        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error fetching suggested wallpapers:", error);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  }

  // Initial load
  useEffect(() => {
    getSuggestedWallpapers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle scroll for pagination
  const handleScroll = Animated.event(
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
          !hasReachedEnd &&
          wallpaper1.length > 0
        ) {
          setIsLoadingMore(true);
          getSuggestedWallpapers();
        }
      },
    }
  );

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Animated.ScrollView
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
      >
        {loading && wallpaper1.length === 0 ? (
          <View style={styles.loadingContainer}>
            <Text style={[styles.loadingText, { color: textColor }]}>
              Loading suggested wallpapers...
            </Text>
          </View>
        ) : (
          <SpiltView
            wallpaper1={wallpaper1}
            wallpaper2={wallpaper2}
            loading={isLoadingMore}
          />
        )}
      </Animated.ScrollView>
    </View>
  );
};

export default Suggested;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    height: 46,
    borderRadius: 23,
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchPlaceholder: {
    fontSize: 16,
    opacity: 0.6,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 56,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    opacity: 0.6,
  },
});
