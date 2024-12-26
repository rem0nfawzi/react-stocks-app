import { create } from "zustand";
import { Stock } from "../types/globalTypes";
import { persist, createJSONStorage } from "zustand/middleware";

type StringOrNull = string | null;

export interface LoadMoreStocks {
  loading: boolean;
  stocks: Stock[];
  error: StringOrNull;
}
interface StocksStore {
  stocks: Stock[];
  loadMoreStocks: LoadMoreStocks;
  error: StringOrNull;
  nextPageUrl: StringOrNull;
  loading: boolean;
  setStocks: (stocks: Stock[], nexPageUrl: StringOrNull) => void;
  setError: (error: string) => void;
  setLoadMoreStocks: (loadMoreStocks: LoadMoreStocks) => void;
  setNextPageUrl: (nextPageUrl: string) => void;
}

export const useStocksStore = create<StocksStore>()(
  persist(
    (set) => ({
      stocks: [],
      error: null,
      nextPageUrl: null,
      loading: false,
      loadMoreStocks: {
        loading: false,
        stocks: [],
        error: null,
      },

      // Methods
      setStocks: (stocks: Stock[], nexPageUrl: StringOrNull) =>
        set(() => ({ stocks, error: null, nextPageUrl: nexPageUrl })),
      setError: (error: string) => set(() => ({ error })),
      setLoading: (loading: boolean) => set(() => ({ loading })),
      setLoadMoreStocks: (loadMoreStocks: LoadMoreStocks) =>
        set(() => ({ loadMoreStocks })),
      setNextPageUrl: (nextPageUrl: string) => set(() => ({ nextPageUrl })),
    }),
    {
      name: "stocks-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
