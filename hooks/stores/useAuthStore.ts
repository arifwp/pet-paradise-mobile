import { create } from "zustand";
import { setStorageItemAsync } from "../useStorageState";

interface AuthState {
  session: string | null;
  isLoading: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const STORAGE_KEY = "session";

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  isLoading: false,

  signIn: async (token: string) => {
    try {
      set({ isLoading: true });
      await setStorageItemAsync(STORAGE_KEY, token);
      set({ session: token, isLoading: false });
    } catch (error) {
      console.error("Sign in error:", error);
      set({ isLoading: false });
      throw error;
    }
  },

  signOut: async () => {
    try {
      set({ isLoading: true });
      await setStorageItemAsync(STORAGE_KEY, null);
      set({ session: null, isLoading: false });
    } catch (error) {
      console.error("Sign out error:", error);
      set({ isLoading: false });
      throw error;
    }
  },
}));
