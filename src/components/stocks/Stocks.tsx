import { useEffect } from "react";
import Search from "./search/Search";
import Error from "./error/Error";
import { fetchStocks } from "../../lib/stockApis";
import { useStocksStore } from "../../store/useStocksStors";
import LoadMore from "./load-more/LoadMore";
import { useSearchStore } from "../../store/useSearchStore";
import { getCurrentMessage } from "./getCurrentMessage";
import CurrentMessage from "./current-message/CurrentMessage";
import StocksList from "./stocks-list/StocksList";

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
      <StocksList
        stocks={showSearchedStocks ? searchStocks.stocks : allStocks}
      />
      <LoadMore />
      {/* We always render the list cause the error may happen on page 2 for example */}
      {!currentMessage && error && <Error error={error} />}
      {currentMessage && <CurrentMessage currentMessage={currentMessage} />}
    </div>
  );
};

export default Stocks;
