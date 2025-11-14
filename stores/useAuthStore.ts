import { AUTH_TOKEN, USER_DATA } from "@/constants";
import {
  getFromSecureStorage,
  removeFromSecureStorage,
  saveToSecureStorage,
} from "@/libs/secure-storage";
import { GoogleUserProp, UserProps } from "@/types";
import { create } from "zustand";

interface AuthStoreProp {
  user: UserProps | null;
  token: string | null;
  loading: boolean;
  initializeAuth: () => Promise<void>;
  login: (token: string, user: UserProps) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthStoreProp>((set, get) => ({
  user: null,
  token: null,
  loading: true,
  initializeAuth: async () => {
    set({ loading: true });
    try {
      const token = await getFromSecureStorage<null>(AUTH_TOKEN);
      const user = await getFromSecureStorage<null>(USER_DATA);
      if (token && user) set({ user, token });
    } catch (error) {
      console.log("init auth error", error);
    } finally {
      set({ loading: false });
    }
  },
  login: async (token, user) => {
    set({ loading: true });
    try {
      await saveToSecureStorage(AUTH_TOKEN, token);
      await saveToSecureStorage(USER_DATA, user);
      set({ user, token });
    } catch (error) {
      console.log("login error", error);
    } finally {
      set({ loading: false });
    }
  },
  logout: async () => {
    set({ loading: true });
    try {
      // await new Promise((res) => setTimeout(res, 1000)); // simulate 1s delay

      await removeFromSecureStorage(AUTH_TOKEN);
      await removeFromSecureStorage(USER_DATA);
      set({ user: null, token: null });
    } catch (error) {
      console.log("logout error", error);
    } finally {
      set({ loading: false });
    }
  },
  isAuthenticated: () => !!get().token && !!get().user,
}));
