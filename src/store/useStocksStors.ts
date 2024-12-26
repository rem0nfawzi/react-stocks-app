import { create } from "zustand";
import { Stock } from "../types/globalTypes";
import { persist, createJSONStorage } from "zustand/middleware";

type StringOrNull = string | null;

export interface LoadMoreStocks {
  stocks: Stock[];
  error: StringOrNull;
}
interface StocksStore {
  stocks: Stock[];
  loadMoreStocks: LoadMoreStocks;
  error: StringOrNull;
  nextPageUrl: StringOrNull;
  loading: boolean;
  searchStocks: {
    stocks: Stock[];
    error: StringOrNull;
    nextPageUrl: StringOrNull;
  };
  setStocks: (stocks: Stock[], nexPageUrl: StringOrNull) => void;
  setError: (error: string) => void;
  setLoading: (loading: boolean) => void;
  setLoadMoreStocks: (loadMoreStocks: LoadMoreStocks) => void;
  setNextPageUrl: (nextPageUrl: string) => void;
  setSearchStocks: (payload: {
    stocks: Stock[];
    error: StringOrNull;
    nextPageUrl: StringOrNull;
  }) => void;
}

export const useStocksStore = create<StocksStore>()(
  persist(
    (set) => ({
      stocks: [],
      error: null,
      nextPageUrl: null,
      loading: false,
      loadMoreStocks: {
        stocks: [],
        error: null,
      },
      searchStocks: {
        stocks: [],
        error: null,
        nextPageUrl: null,
      },

      // Methods
      setStocks: (stocks, nexPageUrl) =>
        set(() => ({ stocks, error: null, nextPageUrl: nexPageUrl })),
      setError: (error) => set(() => ({ error })),
      setLoading: (loading) => set(() => ({ loading })),
      setLoadMoreStocks: (loadMoreStocks) => set(() => ({ loadMoreStocks })),
      setNextPageUrl: (nextPageUrl) => set(() => ({ nextPageUrl })),
      setSearchStocks: (payload) =>
        set(() => ({
          searchStocks: {
            stocks: payload.stocks || [],
            error: payload.error || null,
            nextPageUrl: payload.nextPageUrl,
          },
        })),
    }),
    {
      name: "stocks-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        stocks: state.stocks,
        nextPageUrl: state.nextPageUrl,
        loadMoreStocks: state.loadMoreStocks,
        searchStocks: state.searchStocks,
      }),
    }
  )
);
