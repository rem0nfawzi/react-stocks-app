import { useEffect } from "react";
import { Stock } from "../../types/globalTypes";
import Search from "./search/Search";
import StockItem from "./stock-item/StockItem";
import Error from "./error/Error";
import { fetchStocks } from "../../lib/stockApis";
import { useStocksStore } from "../../store/useStocksStors";
import LoadMore from "./load-more/LoadMore";
import { useSearchStore } from "../../store/useSearchStore";
import { getCurrentMessage } from "./getCurrentMessage";
import { cn } from "../../lib/utils";

const Stocks = () => {
  const {
    stocks,
    searchStocks,
    error,
    loading,
    loadMoreStocks,
    setStocks,
    setError,
    setLoading,
  } = useStocksStore();
  const { searchText } = useSearchStore();

  useEffect(() => {
    if (stocks.length === 0) {
      setLoading(true);
      fetchStocks()
        .then((stocksData) => {
          setStocks(stocksData.list, stocksData.nextPageUrl);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [setError, setLoading, setStocks, stocks]);

  const allStocks = [...stocks, ...loadMoreStocks];
  const showSearchedStocks = searchText.length > 0;

  const currentMessage = getCurrentMessage({
    loading,
    searchText,
    searchStocks,
    showSearchedStocks,
    allStocks,
    error,
  });

  return (
    <div className="container p-6">
      <h1 className="text-2xl font-bold text-white my-16">Explore Stocks</h1>
      <Search />
      <div
        className={cn(
          "grid grid-cols-1 gap-6 mb-6",
          "sm:grid-cols-2 md:grid-cols-3"
        )}
      >
        {!showSearchedStocks &&
          allStocks.map((stock: Stock) => (
            <StockItem key={stock.ticker} stock={stock} />
          ))}
        {showSearchedStocks &&
          searchStocks.stocks.map((stock: Stock) => (
            <StockItem key={stock.ticker} stock={stock} />
          ))}
      </div>
      <LoadMore />
      {/* We always render the list cause the error may happen on page 2 for example */}
      {!currentMessage && error && <Error error={error} />}
      {currentMessage && (
        <p data-testid="current-msg" className="text-white italic font-medium">
          {currentMessage}
        </p>
      )}
    </div>
  );
};

export default Stocks;
