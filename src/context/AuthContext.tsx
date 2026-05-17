import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

interface AuthContextType {
  user: string | null;
  signIn: (email: string) => Promise<void>;
  signUp: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    // Web does not support SecureStore directly without polyfills or is not suitable for storage.
    // For web development, we use localStorage as a fallback.
    if (Platform.OS === 'web') {
      const stored = localStorage.getItem("user");
      setUser(stored);
    } else {
      SecureStore.getItemAsync("user").then((stored) => {
        if (stored) setUser(stored);
      });
    }
  }, []);

  const signIn = async (email: string) => {
    if (Platform.OS === 'web') {
      localStorage.setItem("user", email);
    } else {
      await SecureStore.setItemAsync("user", email);
    }
    setUser(email);
  };

  const signUp = async (email: string) => {
    if (Platform.OS === 'web') {
      localStorage.setItem("user", email);
    } else {
      await SecureStore.setItemAsync("user", email);
    }
    setUser(email);
  };

  const signOut = async () => {
    if (Platform.OS === 'web') {
      localStorage.removeItem("user");
    } else {
      await SecureStore.deleteItemAsync("user");
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
