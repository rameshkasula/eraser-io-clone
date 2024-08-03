import { axiosClient } from "@/utils/axios-helper";
import create from "zustand";

interface File {
  id?: string;
  name: string;
  content?: any;
  whiteboard?: any;
}

interface FileState {
  isLoading: boolean;
  isError: boolean;
  errorMessage: any;
  files: File[];

  // single file
  file: File | null;
  setFile: (file: File) => void;

  setFiles: (files: File[]) => void;
  fetchFiles: () => Promise<void>;
  createFile: (data: File) => Promise<File | void>;
  getFile: (id: string) => Promise<File | void>;
  updateFile: (data: File) => Promise<void>;
  deleteFile: (id: string) => Promise<void>;

  isFileOpen: boolean;
  setIsFileOpen: (isFileOpen: boolean) => void;
}

export const useFileStore = create<FileState>((set) => ({
  isLoading: false,
  isError: false,
  errorMessage: null,
  files: [],

  // single file
  file: null,
  setFile: (file) => set({ file }),

  // set files
  setFiles: (files) => set({ files }),

  // Fetch files
  // @ts-ignore
  fetchFiles: async ({ params }: any) => {
    set({ isLoading: true, isError: false });
    try {
      const response = await axiosClient.get("/files", { params });
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
  getFile: async ({ params }: any) => {
    set({ isLoading: true, isError: false });
    try {
      const response = await axiosClient.get(`/files/${params?.fileId}`, {
        params,
      });

      console.log("response", response);

      set({ file: response.data.file });

      //  return response.data.file;
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

      set((state) => ({
        files: state.files.map((file) =>
          file.id === data.id ? response.data.file : file
        ),
      }));
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

  isFileOpen: false,
  setIsFileOpen: (isFileOpen) => set({ isFileOpen }),
}));
