// src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import * as SecureStore from "expo-secure-store";
import { api } from "@/libs/axios";
import { AUTH_TOKEN } from "@/constants";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
  // refreshAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ useCallback to ensure refreshAuth is stable across renders

  const login = useCallback(async (token: string, user: User) => {
    try {
      await SecureStore.setItemAsync(AUTH_TOKEN, token);
      // api.defaults.headers.common.Authorization = `Bearer ${token}`;
      setUser(user);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await SecureStore.deleteItemAsync(AUTH_TOKEN);
      // delete api.defaults.headers.common.Authorization;
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // useEffect(() => {
  //   const refreshAuth = async (): Promise<void> => {
  //     setIsLoading(true);

  //     try {
  //       const token = await SecureStore.getItemAsync(AUTH_TOKEN);

  //       if (!token) {
  //         setUser(null);
  //         setIsLoggedIn(false);

  //         return;
  //       }

  //       // ✅ Set token once and avoid reactivity issues
  //       // api.defaults.headers.common.Authorization = `Bearer ${token}`;

  //       const { data } = await api.get("/me");

  //       setUser(data.user);
  //       setIsLoggedIn(true);
  //     } catch (err) {
  //       console.error("Auth check failed:", err);
  //       await SecureStore.deleteItemAsync(AUTH_TOKEN);

  //       setUser(null);
  //       setIsLoggedIn(false);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   refreshAuth();
  // }, []);
  const value = useMemo(
    () => ({ user, isLoggedIn, isLoading, login, logout }),
    [user, isLoggedIn, isLoading, login, logout]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
