import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LikedWallpapersState {
  likedIds: string[];
  lastUpdated: number | null;
}

const initialState: LikedWallpapersState = {
  likedIds: [],
  lastUpdated: null,
};

export const LikedWallpapersSlice = createSlice({
  name: "likedWallpapers",
  initialState,
  reducers: {
    toggleLike(state, action: PayloadAction<string>) {
      const wallpaperId = action.payload;
      const index = state.likedIds.indexOf(wallpaperId);
      if (index > -1) {
        state.likedIds.splice(index, 1);
      } else {
        state.likedIds.push(wallpaperId);
      }
      state.lastUpdated = Date.now();
    },
    setLiked(state, action: PayloadAction<string>) {
      if (!state.likedIds.includes(action.payload)) {
        state.likedIds.push(action.payload);
      }
      state.lastUpdated = Date.now();
    },
    setUnliked(state, action: PayloadAction<string>) {
      const index = state.likedIds.indexOf(action.payload);
      if (index > -1) {
        state.likedIds.splice(index, 1);
      }
      state.lastUpdated = Date.now();
    },
    setLikedIds(state, action: PayloadAction<string[]>) {
      // Merge with existing IDs to avoid duplicates
      const newIds = new Set([...state.likedIds, ...action.payload]);
      state.likedIds = Array.from(newIds);
      state.lastUpdated = Date.now();
    },
    refreshLiked(state) {
      state.lastUpdated = Date.now();
    },
  },
});

export const { toggleLike, setLiked, setUnliked, setLikedIds, refreshLiked } =
  LikedWallpapersSlice.actions;
export default LikedWallpapersSlice.reducer;

