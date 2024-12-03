import { View, useColorScheme } from "react-native";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeTheme } from "@/redux/ThemeSlice";
import { useSelector } from "react-redux";

const ThemeProvider = ({ children }) => {
  const themeState = useSelector((state) => state.theme);

  const colorTheme =
    themeState.data !== "" ? themeState.data : useColorScheme();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeTheme(colorTheme));
  }, [colorTheme, dispatch]);

  return <>{children}</>;
};

export default ThemeProvider;
