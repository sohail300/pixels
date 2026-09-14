import { Dimensions, StyleSheet, View } from "react-native";
import { useEffect, useMemo } from "react";
import { useColorScheme } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const cardWidth = (width - 56) / 2;

const HEIGHTS = [
  cardWidth * 1.5,
  cardWidth * 1.7,
  cardWidth * 1.3,
  cardWidth * 1.6,
  cardWidth * 1.45,
  cardWidth * 1.65,
];

const SkeletonBlock = ({
  height,
  color,
}: {
  readonly height: number;
  readonly color: string;
}) => {
  const pulse = useSharedValue(0.5);

  useEffect(() => {
    pulse.value = withRepeat(
      withTiming(1, { duration: 850, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, [pulse]);

  const style = useAnimatedStyle(() => ({ opacity: pulse.value }));

  return (
    <Animated.View
      style={[styles.block, { height, backgroundColor: color }, style]}
    />
  );
};

export default function WallpaperSkeleton({
  count = 6,
}: {
  readonly count?: number;
}) {
  const themeState = useSelector((state: RootState) => state.theme);
  const systemColorScheme = useColorScheme();

  const isDark = useMemo(() => {
    const theme =
      themeState.data === "system" ? systemColorScheme : themeState.data;
    return theme === "dark";
  }, [themeState.data, systemColorScheme]);

  const color = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)";

  const left = HEIGHTS.slice(0, Math.ceil(count / 2));
  const right = HEIGHTS.slice(0, Math.floor(count / 2));

  return (
    <View style={styles.row}>
      <View style={styles.column}>
        {left.map((height, index) => (
          <SkeletonBlock key={`left-${index}`} height={height} color={color} />
        ))}
      </View>
      <View style={[styles.column, { marginTop: 48 }]}>
        {right.map((height, index) => (
          <SkeletonBlock
            key={`right-${index}`}
            height={height}
            color={color}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 16,
    width: "100%",
  },
  column: {
    flex: 1,
  },
  block: {
    width: "100%",
    borderRadius: 16,
    marginBottom: 16,
  },
});
