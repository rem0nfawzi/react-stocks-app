import { create } from "zustand";

interface StocksStore {
  searchText: string;
  setSearchText: (searchText: string) => void;
}

export const useSearchStore = create<StocksStore>()((set) => ({
  searchText: "",

  // Methods
  setSearchText: (text: string) => set(() => ({ searchText: text.trim() })),
}));
