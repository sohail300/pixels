import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch } from "@reduxjs/toolkit";

export const ThemeSlice = createSlice({
  name: "theme",
  initialState: {
    data: "system", // Default to system
  },
  reducers: {
    changeTheme(state, action) {
      // Explicitly set the theme, avoiding any automatic switching
      state.data = action.payload;
      AsyncStorage.setItem("theme", action.payload);
    },
  },
});

export async function initializeTheme(dispatch: Dispatch<any>) {
  try {
    const savedTheme = (await AsyncStorage.getItem("theme")) as string;

    // If no saved theme, default to system
    dispatch(changeTheme(savedTheme || "system"));
  } catch (error) {
    console.error("Error loading theme:", error);
    // Fallback to system if there's an error
    dispatch(changeTheme("system"));
  }
}

export const { changeTheme } = ThemeSlice.actions;
export default ThemeSlice.reducer;
