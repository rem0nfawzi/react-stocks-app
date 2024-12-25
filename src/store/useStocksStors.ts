import { create } from "zustand";
import { Stock } from "../types/globalTypes";

type StringOrNull = string | null;

interface StocksStore {
  stocks: Stock[];
  error: StringOrNull;
  nextPageUrl: StringOrNull;
  setStocks: (stocks: Stock[], nexPageUrl: StringOrNull) => void;
  setError: (error: string) => void;
}

const storedStocks = sessionStorage.getItem("stocks");
export const useStocksStore = create<StocksStore>()((set) => ({
  stocks: (storedStocks && JSON.parse(storedStocks)) || [],
  error: null,
  nextPageUrl: null,

  // Methods
  setStocks: (stocks: Stock[], nexPageUrl: StringOrNull) =>
    set(() => ({ stocks, error: null, nextPageUrl: nexPageUrl })),
  setError: (error: string) => set(() => ({ error })),
}));
