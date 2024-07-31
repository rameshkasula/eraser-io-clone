// create store

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Team {
  createdBy: string;
  teamName: string;
  _creationTime: number;
  _id: string;
}

export interface TeamsState {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  teamsList: Team[];
  setTeamsList: (teams: Team[]) => void;

  selectedTeam: string | null;
  setSelectedTeam: (team: Team | null) => void;

  commandOpen: boolean;
  setCommandOpen: (open: boolean) => void;
}

const useTeams = create(
  persist(
    (set) => ({
      isLoading: false,
      setIsLoading: (isLoading: boolean) => set({ isLoading }),
      teamsList: [],
      setTeamsList: (teamsList: any[]) => set({ teamsList }),

      selectedTeam: null,
      setSelectedTeam: (team: string | null) => set({ selectedTeam: team }),

      commandOpen: false,
      setCommandOpen: (open: boolean) => set({ commandOpen: open }),
    }),
    {
      name: "teams-storage", // name of the item in the storage
    }
  )
);

export default useTeams;
