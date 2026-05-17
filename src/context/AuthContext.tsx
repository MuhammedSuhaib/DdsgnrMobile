import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

interface UserData {
  email: string;
  name: string;
}

interface AuthContextType {
  user: UserData | null;
  signIn: (email: string, name: string) => Promise<void>;
  signUp: (email: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      if (Platform.OS === 'web') {
        const stored = localStorage.getItem("user");
        if (stored) setUser(JSON.parse(stored));
      } else {
        const stored = await SecureStore.getItemAsync("user");
        if (stored) setUser(JSON.parse(stored));
      }
    };
    loadUser();
  }, []);

  const signIn = async (email: string, name: string) => {
    const userData = { email, name };
    if (Platform.OS === 'web') {
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      await SecureStore.setItemAsync("user", JSON.stringify(userData));
    }
    setUser(userData);
  };

  const signUp = async (email: string, name: string) => {
    const userData = { email, name };
    if (Platform.OS === 'web') {
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      await SecureStore.setItemAsync("user", JSON.stringify(userData));
    }
    setUser(userData);
  };

  const signOut = async () => {
    if (Platform.OS === 'web') {
      localStorage.clear();
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
