// Updated Suggested component
import {
  StyleSheet,
  useColorScheme,
  View,
  Animated,
  ToastAndroid,
} from "react-native";
import React, { useMemo, useState, useEffect, useRef, useContext } from "react";
import SpiltView from "@/components/SpiltView";
import WallpaperSkeleton from "@/components/WallpaperSkeleton";
import { useSelector, useDispatch } from "react-redux";
import { Colors } from "@/constants/Colors";
import { BACKEND_URL, LIMIT } from "@/lib/config";
import { RootState } from "@/redux/store";
import { store } from "@/redux/store";
import { setLikedIds } from "@/redux/LikedWallpapersSlice";
import { applyLikedState } from "@/lib/likes";
import { apiHeaders, fetchWithTimeout } from "@/lib/api";
import ListMessage from "@/components/ListMessage";
import SlowLoadingHint from "@/components/SlowLoadingHint";
import { SessionContext } from "@/context/SessionContext";

const Suggested = () => {
  const themeState = useSelector((state: RootState) => state.theme);
  const systemColorScheme = useColorScheme();

  const colorTheme = useMemo(() => {
    return themeState.data === "system" ? systemColorScheme : themeState.data;
  }, [themeState.data, systemColorScheme]);

  const scrollY = useRef(new Animated.Value(0)).current;
  const bgColor =
    colorTheme === "dark" ? Colors.dark.background : Colors.light.background;

  // State for wallpapers
  const [wallpaper1, setWallpaper1] = useState<any[]>([]);
  const [wallpaper2, setWallpaper2] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [limit] = useState(LIMIT);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  // True when the first page failed to load, so the list shows a retry message.
  const [loadError, setLoadError] = useState(false);
  const loadMoreFailedAtRef = useRef(0);
  // Bumped on every reset so responses to requests made before it are ignored.
  const requestGenerationRef = useRef(0);
  const { session } = useContext(SessionContext);
  const userId = session?.user?.id;

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
      setWallpaper1((prev) => applyLikedState(prev, likedIds));
      setWallpaper2((prev) => applyLikedState(prev, likedIds));
    }
  }, [likedWallpapers.lastUpdated]);

  // Function to fetch suggested wallpapers
  async function getSuggestedWallpapers(reset = false) {
    const generation = requestGenerationRef.current;
    const currentSkip = reset ? 0 : page * limit;
    try {
      const response = await fetchWithTimeout(
        `${BACKEND_URL}/suggested?skip=${currentSkip}&limit=${limit}`,
        {
          method: "GET",
          headers: apiHeaders(session?.access_token),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (generation !== requestGenerationRef.current) return;
      setLoadError(false);

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

          if (reset) {
            setWallpaper1(newItems.slice(0, midpoint));
            setWallpaper2(newItems.slice(midpoint));
          } else {
            setWallpaper1((prev: any[]) => [
              ...prev,
              ...newItems.slice(0, midpoint),
            ]);
            setWallpaper2((prev) => [...prev, ...newItems.slice(midpoint)]);
          }

          // Alternate for next fetch
          leftGetsExtraRef.current = !leftGetsExtraRef.current;
        }

        setPage(reset ? 1 : (prev) => prev + 1);
      } else if (reset) {
        setWallpaper1([]);
        setWallpaper2([]);
      }
    } catch (error) {
      if (generation !== requestGenerationRef.current) return;
      console.log("Error fetching suggested wallpapers:", error);
      if (currentSkip === 0) {
        setLoadError(true);
      } else {
        loadMoreFailedAtRef.current = Date.now();
        ToastAndroid.show("Couldn't load more wallpapers", ToastAndroid.SHORT);
      }
    } finally {
      if (generation === requestGenerationRef.current) {
        setLoading(false);
        setIsLoadingMore(false);
      }
    }
  }

  // Start over from the first page (initial load, retry, or a different user).
  function reload() {
    requestGenerationRef.current += 1;
    existingIdsRef.current.clear();
    leftGetsExtraRef.current = true;
    setHasReachedEnd(false);
    setLoadError(false);
    setIsLoadingMore(false);
    setLoading(true);
    getSuggestedWallpapers(true);
  }

  // Initial load, and again when the signed-in user changes: suggestions are
  // personalized from the user's likes.
  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

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
          wallpaper1.length > 0 &&
          Date.now() - loadMoreFailedAtRef.current > 5000
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
          <>
            <SlowLoadingHint active />
            <WallpaperSkeleton count={8} />
          </>
        ) : loadError && wallpaper1.length === 0 ? (
          <ListMessage
            icon="cloud-offline-outline"
            title="Couldn't load suggestions"
            subtitle="Check your internet connection and try again."
            actionLabel="Try again"
            onAction={reload}
          />
        ) : wallpaper1.length === 0 && wallpaper2.length === 0 ? (
          <ListMessage
            icon="sparkles-outline"
            title="No suggestions yet"
            subtitle="Like a few wallpapers and we'll suggest more you'll love."
          />
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 80,
  },
});
