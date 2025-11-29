import { View, Text, StyleSheet, useColorScheme, Animated } from "react-native";
import React, { useMemo, useState, useContext, useEffect, useRef } from "react";
import { Colors } from "@/constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { SessionContext } from "@/context/SessionContext";
import { RootState } from "@/redux/store";
import SpiltView from "@/components/SpiltView";
import { BACKEND_URL, LIMIT } from "@/lib/config";
import { setLikedIds } from "@/redux/LikedWallpapersSlice";

const Liked = () => {
  const themeState = useSelector((state: RootState) => state.theme);
  const systemColorScheme = useColorScheme();
  const { session } = useContext(SessionContext);

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
  const dispatch = useDispatch();
  const likedWallpapers = useSelector(
    (state: RootState) => state.likedWallpapers
  );

  // Check if user is logged in
  const isLoggedIn = session || session?.access_token;

  // Track if this is the initial load
  const isInitialLoadRef = useRef(true);
  const isRefreshingRef = useRef(false);

  // Refresh liked wallpapers when global state changes (but not on initial load)
  useEffect(() => {
    if (
      likedWallpapers.lastUpdated &&
      isLoggedIn &&
      !isInitialLoadRef.current
    ) {
      // Reset and reload liked wallpapers
      isRefreshingRef.current = true;
      existingIdsRef.current.clear();
      setWallpaper1([]);
      setWallpaper2([]);
      setPage(0);
      setHasReachedEnd(false);
      leftGetsExtraRef.current = true;
      setLoading(true);
      // Call with skip=0 explicitly to start from beginning
      setTimeout(() => {
        getLikedWallpapers(0);
        isRefreshingRef.current = false;
      }, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likedWallpapers.lastUpdated]);

  // Function to fetch liked wallpapers
  async function getLikedWallpapers(skipOverride?: number) {
    if (!isLoggedIn) {
      setLoading(false);
      return;
    }

    try {
      const currentSkip =
        skipOverride !== undefined ? skipOverride : page * limit;
      const response = await fetch(
        `${BACKEND_URL}/liked-wallpapers?skip=${currentSkip}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 400 || response.status === 401) {
          // Not authorized or no liked wallpapers
          if (page === 0) {
            setWallpaper1([]);
            setWallpaper2([]);
          }
          setLoading(false);
          setIsLoadingMore(false);
          return;
        }
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

          // Update global state with all liked wallpaper IDs (only if not already in state)
          // Only update on initial load to avoid triggering refresh loop
          if (
            skipOverride === 0 &&
            isInitialLoadRef.current &&
            !isRefreshingRef.current
          ) {
            const currentLikedIds = new Set(likedWallpapers.likedIds);
            const newLikedIds: string[] = [];
            newItems.forEach((item: any) => {
              const itemId = String(item.id);
              if (!currentLikedIds.has(itemId)) {
                newLikedIds.push(itemId);
              }
            });
            if (newLikedIds.length > 0) {
              dispatch(setLikedIds(newLikedIds));
            }
          }

          // Alternate which side gets the extra item to maintain balance
          const midpoint = leftGetsExtraRef.current
            ? Math.ceil(newItems.length / 2)
            : Math.floor(newItems.length / 2);

          // Update both arrays - replace if resetting, append if loading more
          if (skipOverride === 0 || isRefreshingRef.current) {
            // Reset arrays for fresh start
            setWallpaper1(newItems.slice(0, midpoint));
            setWallpaper2(newItems.slice(midpoint));
          } else {
            // Append to existing arrays
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

        // Only increment page if not using skipOverride
        if (skipOverride === undefined) {
          setPage((prev) => prev + 1);
        } else {
          // If using skipOverride, set page based on skip
          setPage(Math.floor(skipOverride / limit) + 1);
        }
      } else if (currentSkip === 0) {
        // No results for initial load
        setWallpaper1([]);
        setWallpaper2([]);
      }
    } catch (error) {
      console.error("Error fetching liked wallpapers:", error);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  }

  // Initial load
  useEffect(() => {
    if (isLoggedIn) {
      isInitialLoadRef.current = true;
      getLikedWallpapers(0);
      // Mark initial load as complete after a short delay
      setTimeout(() => {
        isInitialLoadRef.current = false;
      }, 1000);
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

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
          isLoggedIn
        ) {
          setIsLoadingMore(true);
          getLikedWallpapers();
        }
      },
    }
  );

  const renderContent = () => {
    if (!isLoggedIn) {
      return (
        <View style={styles.emptyStateContainer}>
          <View style={styles.emptyStateContent}>
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor:
                    colorTheme === "dark" ? "#2A2A2A" : "#F5F5F5",
                },
              ]}
            >
              <Ionicons
                name="lock-closed"
                size={40}
                color={Colors.light.accent}
              />
            </View>
            <Text style={[styles.emptyStateTitle, { color: textColor }]}>
              Please log in
            </Text>
            <Text style={[styles.emptyStateSubtitle, { color: textColor }]}>
              You must be logged in to view your liked wallpapers
            </Text>
          </View>
        </View>
      );
    }

    if (loading && wallpaper1.length === 0) {
      return (
        <View style={styles.emptyStateContainer}>
          <Text style={[styles.emptyStateSubtitle, { color: textColor }]}>
            Loading liked wallpapers...
          </Text>
        </View>
      );
    }

    if (wallpaper1.length === 0 && !loading) {
      return (
        <View style={styles.emptyStateContainer}>
          <View style={styles.emptyStateContent}>
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor:
                    colorTheme === "dark" ? "#2A2A2A" : "#F5F5F5",
                },
              ]}
            >
              <Ionicons name="heart" size={40} color={Colors.light.accent} />
            </View>
            <Text style={[styles.emptyStateTitle, { color: textColor }]}>
              No liked wallpapers yet
            </Text>
            <Text style={[styles.emptyStateSubtitle, { color: textColor }]}>
              Tap the heart icon on any wallpaper to add it to your liked
              wallpapers
            </Text>
          </View>
        </View>
      );
    }

    return (
      <Animated.ScrollView
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
      >
        <SpiltView
          wallpaper1={wallpaper1}
          wallpaper2={wallpaper2}
          loading={isLoadingMore}
        />
      </Animated.ScrollView>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {renderContent()}
    </View>
  );
};

export default Liked;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyStateContent: {
    alignItems: "center",
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  emptyStateSubtitle: {
    fontSize: 16,
    textAlign: "center",
    opacity: 0.7,
    lineHeight: 22,
  },
});
