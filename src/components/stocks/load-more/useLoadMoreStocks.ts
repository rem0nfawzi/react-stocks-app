import { useEffect, useRef } from "react";
import { fetchStocks } from "../../../lib/stockApis";
import { useStocksStore } from "../../../store/useStocksStors";
import { useSearchStore } from "../../../store/useSearchStore";
import { Stock } from "../../../types/globalTypes";

export const useLoadMoreStocks: () => [
  React.RefObject<HTMLDivElement>,
  Stock[]
] = () => {
  const {
    nextPageUrl,
    stocks,
    loading,
    loadMoreStocks,
    setLoadMoreStocks,
    setNextPageUrl,
    setLoading,
    setError,
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
          setError(null);
          fetchStocks(nextPageUrl + `&apiKey=tiLfPn2sjd2dg_f5iwChGMC3szC3GXpY`)
            .then((stocksData) => {
              setLoading(false);
              setLoadMoreStocks([...loadMoreStocks, ...stocksData.list]);
              if (stocksData.nextPageUrl)
                setNextPageUrl(stocksData.nextPageUrl);
            })
            .catch((error) => {
              setError(error.message);
              setLoading(false);
            });
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
  }, [nextPageUrl, shouldWaitForSearch]);

  return [targetRef, loadMoreStocks];
};
