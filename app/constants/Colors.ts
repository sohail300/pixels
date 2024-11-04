/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#fdd700";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#1a1a1a",
    tint: tintColorDark,
    icon: "#626262",
    tabIconDefault: "#626262",
    tabIconSelected: tintColorDark,
  },
  brand: {
    accentColor: "#fdd700",
    grayBackgroundColor: "#2c2c2c",
    blackBackgroundColor: "#1a1a1a",
  },
};
