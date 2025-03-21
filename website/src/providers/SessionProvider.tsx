"use client";

import { supabase } from "@/lib/supabase";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type SessionContextType = {
  session: any;
  loading: boolean;
};

export const SessionContext = createContext<SessionContextType | undefined>(
  undefined
);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      if (data.session) {
        localStorage.setItem("token", data.session.access_token);
      }
      setLoading(false);
    };

    fetchSession(); // Get session on mount

    // Listen for auth state changes
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      data.subscription.unsubscribe(); // Correct way to unsubscribe
    };
  }, []);

  return (
    <SessionContext.Provider value={{ session, loading }}>
      {children}
    </SessionContext.Provider>
  );
};

// Custom hook to access session globally
export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
