import { useEffect, useRef } from "react";
import { fetchStocks } from "../../../lib/stockApis";
import { LoadMoreStocks, useStocksStore } from "../../../store/useStocksStors";

export const useLoadMoreStocks: () => [
  React.RefObject<HTMLDivElement>,
  LoadMoreStocks
] = () => {
  const {
    nextPageUrl,
    stocks,
    loadMoreStocks,
    setLoadMoreStocks,
    setNextPageUrl,
  } = useStocksStore();

  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = targetRef?.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && nextPageUrl && !loadMoreStocks.loading) {
          setLoadMoreStocks({ ...loadMoreStocks, loading: true });
          setTimeout(() => {
            fetchStocks(
              nextPageUrl + `&apiKey=tiLfPn2sjd2dg_f5iwChGMC3szC3GXpY`
            )
              .then((stocksData) => {
                setLoadMoreStocks({
                  stocks: [...loadMoreStocks.stocks, ...stocksData.list],
                  loading: false,
                  error: null,
                });
                if (stocksData.nextPageUrl)
                  setNextPageUrl(stocksData.nextPageUrl);
              })
              .catch((error) =>
                setLoadMoreStocks({ ...loadMoreStocks, loading: false, error })
              );
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
    loadMoreStocks,
    nextPageUrl,
    stocks.length,
    setLoadMoreStocks,
    setNextPageUrl,
  ]);

  return [targetRef, loadMoreStocks];
};
