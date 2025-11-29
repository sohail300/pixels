import { configureStore } from "@reduxjs/toolkit";
import ThemeReducer from "./ThemeSlice";
import LikedWallpapersReducer from "./LikedWallpapersSlice";

export const store = configureStore({
  reducer: {
    theme: ThemeReducer,
    likedWallpapers: LikedWallpapersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
