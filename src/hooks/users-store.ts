import { axiosClient } from "@/utils/axios-helper";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      isLoading: false,
      isError: false,
      errorMessage: null,
      users: [],

      // logged in user
      user: null,

      setUser: (user: any) => {
        set({ user });
      },

      // function to fetch users
      fetchUsers: async () => {
        set({ isLoading: true, isError: false });
        try {
          const response = await axiosClient.get("/auth/users");
          set({ users: response.data?.users || [] });
        } catch (error) {
          set({
            isError: true,
            // @ts-ignore
            errorMessage: error?.message || "Error fetching users",
          });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "users-store", // name of the store
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
    }
  )
);
