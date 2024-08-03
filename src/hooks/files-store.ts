import { axiosClient } from "@/utils/axios-helper";
import create from "zustand";

interface File {
  id?: string;
  name: string; // Adjust according to your file structure
  image: string;
  category?: string;
}

interface FileState {
  isLoading: boolean;
  isError: boolean;
  errorMessage: any;
  files: File[];
  setFiles: (files: File[]) => void;
  fetchFiles: () => Promise<void>;
  createFile: (data: File) => Promise<File | void>;
  getFile: (id: string) => Promise<File | void>;
  updateFile: (data: File) => Promise<void>;
  deleteFile: (id: string) => Promise<void>;
}

export const useFileStore = create<FileState>((set) => ({
  isLoading: false,
  isError: false,
  errorMessage: null,
  files: [],

  // set files
  setFiles: (files) => set({ files }),

  // Fetch files
  fetchFiles: async () => {
    set({ isLoading: true, isError: false });
    try {
      const response = await axiosClient.get("/files");
      set({ files: response.data?.files || [] });
    } catch (error) {
      set({
        isError: true,
        // @ts-ignore
        errorMessage: error?.message || "Error fetching files",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  // Create file
  createFile: async (data) => {
    set({ isLoading: true, isError: false });
    try {
      const response = await axiosClient.post("/files", data);
      set((state) => ({
        files: [...state.files, response.data.file],
      }));
      return response.data;
    } catch (error) {
      set({
        isError: true,
        // @ts-ignore
        errorMessage: error.message || "Error creating file",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  // Get file
  getFile: async (id) => {
    set({ isLoading: true, isError: false });
    try {
      const response = await axiosClient.get(`/files/${id}`);
      return response.data.file;
    } catch (error) {
      set({
        isError: true,
        // @ts-ignore
        errorMessage: error.message || "Error fetching file",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  // Update file
  updateFile: async (data) => {
    set({ isLoading: true, isError: false });
    try {
      const response = await axiosClient.put(`/files/${data.id}`, data);

      console.log("response", response);

      set((state) => ({
        files: state.files.map((file) =>
          file.id === data.id ? response.data.file : file
        ),
      }));

      return response.data;
    } catch (error) {
      set({
        isError: true, // @ts-ignore
        errorMessage: error.message || "Error updating file",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  // Delete file
  deleteFile: async (id) => {
    set({ isLoading: true, isError: false });
    try {
      await axiosClient.delete(`/files/${id}`);
      set((state) => ({ files: state.files.filter((file) => file.id !== id) }));
    } catch (error) {
      set({
        isError: true, // @ts-ignore
        errorMessage: error.message || "Error deleting file",
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
