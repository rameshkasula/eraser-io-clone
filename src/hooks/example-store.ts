import { axiosClient } from "@/utils/axios-helper";
import create from "zustand";

interface Category {
  id?: string;
  name: string; // Adjust according to your category structure
  image: string;
}

interface CategoryState {
  isLoading: boolean;
  isError: boolean;
  errorMessage: any;
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  fetchCategories: () => Promise<void>;
  createCategory: (data: Category) => Promise<Category | void>;
  getCategory: (id: string) => Promise<Category | void>;
  updateCategory: (data: Category) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  isLoading: false,
  isError: false,
  errorMessage: null,
  categories: [],

  setCategories: (categories) => set({ categories }),

  // Fetch categories
  fetchCategories: async () => {
    set({ isLoading: true, isError: false });
    try {
      const response = await axiosClient.get("/categories");
      set({ categories: response.data?.categories || [] });
    } catch (error) {
      set({
        isError: true,
        // @ts-ignore
        errorMessage: error?.message || "Error fetching categories",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  // Create category
  createCategory: async (data) => {
    set({ isLoading: true, isError: false });
    try {
      const response = await axiosClient.post("/categories", data);
      set((state) => ({
        categories: [...state.categories, response.data.category],
      }));
      return response.data;
    } catch (error) {
      set({
        isError: true,
        // @ts-ignore
        errorMessage: error.message || "Error creating category",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  // Get category
  getCategory: async (id) => {
    set({ isLoading: true, isError: false });
    try {
      const response = await axiosClient.get(`/categories/${id}`);
      return response.data.category;
    } catch (error) {
      set({
        isError: true,
        // @ts-ignore
        errorMessage: error.message || "Error fetching category",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  // Update category
  updateCategory: async (data) => {
    set({ isLoading: true, isError: false });
    try {
      const response = await axiosClient.put(`/categories/${data.id}`, data);

      console.log("response", response);

      set((state) => ({
        categories: state.categories.map((category) =>
          category.id === data.id ? response.data.category : category
        ),
      }));

      return response.data;
    } catch (error) {
      set({
        isError: true,
        // @ts-ignore
        errorMessage: error.message || "Error updating category",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  // Delete category
  deleteCategory: async (id) => {
    set({ isLoading: true, isError: false });
    try {
      await axiosClient.delete(`/categories/${id}`);
      set((state) => ({
        categories: state.categories.filter((category) => category.id !== id),
      }));
    } catch (error) {
      set({
        isError: true,
        // @ts-ignore
        errorMessage: error.message || "Error deleting category",
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
