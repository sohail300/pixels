// BottomSheetContext.ts
import { createContext } from "react";

type BottomSheetContextType = {
  showBottomSheet: boolean;
  setShowBottomSheet: (show: boolean) => void;
  id: string;
  setId: (id: string) => void;
  url: string;
  setUrl: (url: string) => void;
  name: string;
  setName: (name: string) => void;
  downloads: number;
  setDownloads: (downloads: number) => void;
  likes: number;
  setLikes: (likes: number) => void;
  categories: string[];
  setCategories: (categories: string[]) => void;
  hasLiked: boolean;
  setHasLiked: (hasLiked: boolean) => void;
  uploaderName: string;
  setUploaderName: (uploaderName: string) => void;
  uploaderImage: string;
  setUploaderImage: (uploaderImage: string) => void;
};

// Provide a default value matching the type
export const BottomSheetContext = createContext<BottomSheetContextType>({
  showBottomSheet: false,
  setShowBottomSheet: () => {},
  id: "",
  setId: () => {},
  url: "",
  setUrl: () => {},
  name: "",
  setName: () => {},
  downloads: 0,
  setDownloads: () => {},
  likes: 0,
  setLikes: () => {},
  categories: [],
  setCategories: () => {},
  hasLiked: false,
  setHasLiked: () => {},
  uploaderName: "",
  setUploaderName: () => {},
  uploaderImage: "",
  setUploaderImage: () => {},
});
