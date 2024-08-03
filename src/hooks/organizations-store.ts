// store for organizations

import { axiosClient } from "@/utils/axios-helper";
import create from "zustand";

interface Organization {
  id?: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  state: string;
  city: string;
  country: string;
}

interface OrganizationsState {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  organizations: Organization[];

  getOrganizations: () => Promise<void>;
  createOrganization: (data: Organization) => Promise<Organization | void>;
  getOrganization: (id: string) => Promise<Organization | void>;
  updateOrganization: (data: Organization) => Promise<void>;
  deleteOrganization: (id: string) => Promise<void>;
}

export const useOrganizationsStore = create<OrganizationsState>((set) => ({
  isLoading: false,
  isError: false,
  errorMessage: "",
  organizations: [],

  // Get organizations
  getOrganizations: async () => {
    set({ isLoading: true, isError: false });
    try {
      const response = await axiosClient.get("/organizations");
      set({ organizations: response.data?.organizations || [] });
    } catch (error) {
      set({
        isError: true,
        // @ts-ignore
        errorMessage: error?.message || "Error fetching organizations",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  // Create organization
  createOrganization: async (data: Organization) => {
    set({ isLoading: true, isError: false });
    try {
      const response = await axiosClient.post("/organizations", data);
      set((state) => ({
        organizations: [...state.organizations, response.data.organization],
      }));

      console.log("response", response.data);
      return response.data;
    } catch (error) {
      set({
        isError: true,
        // @ts-ignore
        errorMessage: error?.message || "Error creating organization",
      });

      console.log("error", error);

      return error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Get organization
  getOrganization: async (id) => {
    set({ isLoading: true, isError: false });
    try {
      const response = await axiosClient.get(`/organizations/${id}`);
      return response.data.organization;
    } catch (error) {
      set({
        isError: true,
        // @ts-ignore
        errorMessage: error?.message || "Error fetching organization",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  // Update organization
  updateOrganization: async (data) => {
    set({ isLoading: true, isError: false });
    try {
      await axiosClient.put(`/organizations/${data.id}`, data);
      set((state) => ({
        organizations: state.organizations.map((organization) =>
          organization.id === data.id ? data : organization
        ),
      }));
    } catch (error) {
      set({
        isError: true,
        // @ts-ignore
        errorMessage: error?.message || "Error updating organization",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  // Delete organization
  deleteOrganization: async (id) => {
    set({ isLoading: true, isError: false });
    try {
      await axiosClient.delete(`/organizations/${id}`);
      set((state) => ({
        organizations: state.organizations.filter(
          (organization) => organization.id !== id
        ),
      }));
    } catch (error) {
      set({
        isError: true,
        // @ts-ignore
        errorMessage: error?.message || "Error deleting organization",
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
