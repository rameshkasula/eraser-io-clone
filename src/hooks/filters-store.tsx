// filters store

import { create } from "zustand";
import { persist } from "zustand/middleware";
import moment from "moment";

export const useFiltersStore = create((set) => ({
  startDate: moment().toDate(),
  endDate: moment().toDate(),
  status: "all",
  search: "",

  // set values
  setStartDate: (date: string) => set({ startDate: date }),
  setEndDate: (date: string) => set({ endDate: date }),
  setStatus: (status: string) => set({ status }),
  setSearch: (search: string) => set({ search }),
}));
