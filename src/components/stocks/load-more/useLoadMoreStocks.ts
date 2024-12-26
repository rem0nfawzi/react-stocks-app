import { useEffect, useRef } from "react";
import { fetchStocks } from "../../../lib/stockApis";
import { LoadMoreStocks, useStocksStore } from "../../../store/useStocksStors";
import { useSearchStore } from "../../../store/useSearchStore";

export const useLoadMoreStocks: () => [
  React.RefObject<HTMLDivElement>,
  LoadMoreStocks
] = () => {
  const {
    nextPageUrl,
    stocks,
    loading,
    loadMoreStocks,
    setLoadMoreStocks,
    setNextPageUrl,
    setLoading,
  } = useStocksStore();
  const { searchText } = useSearchStore();
  const targetRef = useRef<HTMLDivElement>(null);

  const shouldWaitForSearch = searchText.length > 0 && searchText.length < 3;
  useEffect(() => {
    const element = targetRef?.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (
          entry.isIntersecting &&
          nextPageUrl &&
          !loading &&
          !shouldWaitForSearch
        ) {
          setLoading(true);
          setTimeout(() => {
            fetchStocks(
              nextPageUrl + `&apiKey=tiLfPn2sjd2dg_f5iwChGMC3szC3GXpY`
            )
              .then((stocksData) => {
                setLoadMoreStocks({
                  stocks: [...loadMoreStocks.stocks, ...stocksData.list],
                  error: null,
                });
                if (stocksData.nextPageUrl)
                  setNextPageUrl(stocksData.nextPageUrl);

                setLoading(false);
              })
              .catch((error) => {
                setLoadMoreStocks({ ...loadMoreStocks, error: error.message });
                setLoading(false);
              });
          }, 1000);
        }
      },
      { threshold: 0.5 }
    );

    if (element && stocks.length > 0) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [
    stocks.length,
    nextPageUrl,
    setLoadMoreStocks,
    setNextPageUrl,
    setLoading,
  ]);

  return [targetRef, loadMoreStocks];
};
