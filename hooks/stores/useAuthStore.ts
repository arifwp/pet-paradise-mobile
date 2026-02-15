import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
}

export const dummyUser: User = {
  id: "dummy-user-01",
  name: "Dummy User",
  email: "dummy@gmail.com",
  avatar: "https://placehold.co/500x500.png",
};

const initialState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

interface AuthState {
  // State
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions - Authentication
  login: (user: User, token: string, refreshToken?: string) => void;
  logout: () => Promise<void>;
  updateUser: (user: Partial<User>) => void;
  updateToken: (token: string, refreshToken?: string) => void;

  // Actions - State Management
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;

  // Utilities
  reset: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Login - set user dan token
      login: (user: User, token: string, refreshToken?: string) => {
        set({
          user,
          token,
          refreshToken: refreshToken || null,
          isAuthenticated: true,
          error: null,
        });
      },

      // Logout - clear semua data dan AsyncStorage
      logout: async () => {
        try {
          // Clear AsyncStorage
          await AsyncStorage.removeItem("auth-storage");

          // Reset state
          set(initialState);
        } catch (error) {
          console.error("Logout error:", error);
          set({ error: "Failed to logout" });
        }
      },

      // Update user data (partial update)
      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...userData },
          });
        }
      },

      // Update token (untuk refresh token flow)
      updateToken: (token: string, refreshToken?: string) => {
        set({
          token,
          ...(refreshToken && { refreshToken }),
        });
      },

      // Set loading state
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      // Set error message
      setError: (error: string | null) => {
        set({ error });
      },

      // Clear error message
      clearError: () => {
        set({ error: null });
      },

      // Reset to initial state (tanpa clear AsyncStorage)
      reset: () => {
        set(initialState);
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),

      // Partition untuk memilih data yang di-persist
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
        // Tidak persist: isLoading, error
      }),

      // Callback setelah rehydrate
      onRehydrateStorage: () => (state) => {
        // Set loading false setelah data di-load dari AsyncStorage
        state?.setLoading(false);
      },
    },
  ),
);
