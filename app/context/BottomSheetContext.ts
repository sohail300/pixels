// BottomSheetContext.ts
import { createContext } from "react";

type BottomSheetContextType = {
  showBottomSheet: boolean;
  setShowBottomSheet: (show: boolean) => void;
  url: string;
  setUrl: (url: string) => void;
  name: string;
  setName: (name: string) => void;
};

// Provide a default value matching the type
export const BottomSheetContext = createContext<BottomSheetContextType>({
  showBottomSheet: false,
  setShowBottomSheet: () => {},
  url: "",
  setUrl: () => {},
  name: "",
  setName: () => {},
});
