// SessionContext.ts
import { createContext } from "react";

type SessionContextType = {
  session: any;
  setSession: (session: any) => void;
};

// Provide a default value matching the type
export const SessionContext = createContext<SessionContextType>({
  session: null,
  setSession: () => {},
});
