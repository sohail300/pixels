import { View, useColorScheme } from "react-native";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

const ThemeProvider = ({ children }) => {
  const themeState = useSelector((state) => state.theme);
  const systemColorScheme = useColorScheme();

  const colorTheme = useMemo(() => {
    // Only use system color scheme when theme is set to "system"
    return themeState.data === "system" ? systemColorScheme : themeState.data;
  }, [themeState.data, systemColorScheme]);

  return <>{children}</>;
};

export default ThemeProvider;
