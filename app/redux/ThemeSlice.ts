import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeSlice = createSlice({
  name: "theme",
  initialState: {
    data: "dark",
  },
  reducers: {
    changeTheme(state, action) {
      state.data = action.payload;
      AsyncStorage.setItem("theme", action.payload);
    },
  },
});

export async function initializeTheme(dispatch) {
  try {
    const savedTheme = await AsyncStorage.getItem("theme");

    if (savedTheme) {
      dispatch(changeTheme(savedTheme));
    }
  } catch (error) {
    console.error("Error loading theme:", error);
  }
}

export const { changeTheme } = ThemeSlice.actions;
export default ThemeSlice.reducer;
