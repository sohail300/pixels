import { useColorScheme } from "react-native";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const ThemeProvider = ({
  children,
}: {
  readonly children: React.ReactNode;
}) => {
  const themeState = useSelector((state: RootState) => state.theme);
  const systemColorScheme = useColorScheme();

  const colorTheme = useMemo(() => {
    // Only use system color scheme when theme is set to "system"
    return themeState.data === "system" ? systemColorScheme : themeState.data;
  }, [themeState.data, systemColorScheme]);

  return <>{children}</>;
};

export default ThemeProvider;
