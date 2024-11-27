import { createSlice } from "@reduxjs/toolkit";
import { useColorScheme } from "react-native";

export const ThemeSlice = createSlice({
  name: "theme",
  initialState: {
    data: "dark",
  },
  reducers: {
    changeTheme(state, action) {
      state.data = action.payload;
    },
  },
});

export const { changeTheme } = ThemeSlice.actions;
export default ThemeSlice.reducer;
