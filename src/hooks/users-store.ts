import { axiosClient } from "@/utils/axios-helper";
import { create } from "zustand";

interface UserState {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  users: any[];

  // function to fetch users
  fetchUsers: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  isLoading: false,
  isError: false,
  errorMessage: null,
  users: [],

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
}));
