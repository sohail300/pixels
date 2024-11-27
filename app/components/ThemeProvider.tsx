import { View, useColorScheme } from "react-native";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeTheme } from "@/redux/ThemeSlice";

const ThemeProvider = ({ children }) => {
  const theme = useColorScheme();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeTheme(theme));
  }, [theme, dispatch]);

  return <>{children}</>;
};

export default ThemeProvider;
