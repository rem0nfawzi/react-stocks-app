import { useEffect } from "react";
import { Stock } from "../../types/globalTypes";
import Search from "./search/Search";
import StockItem from "./stock-item/StockItem";
import Error from "./error/Error";
import { fetchStocks } from "../../lib/stockApis";
import { useStocksStore } from "../../store/useStocksStors";
import LoadMore from "./load-more/LoadMore";

const Stocks = () => {
  const { stocks, error, loadMoreStocks, setStocks, setError } =
    useStocksStore();
  useEffect(() => {
    if (stocks.length === 0)
      fetchStocks()
        .then((stocksData) =>
          setStocks(stocksData.list, stocksData.nextPageUrl)
        )
        .catch((error) => setError(error.message));
  }, [setError, setStocks, stocks]);

  const allStocks = [...stocks, ...loadMoreStocks.stocks];
  console.log({ allStocks });

  return (
    <div className="container pb-12">
      <h1 className="text-2xl font-bold text-white my-16">Explore Stocks</h1>
      <Search />
      <div className="grid grid-cols-3 gap-6 mb-6">
        {allStocks.map((stock: Stock) => (
          <StockItem key={stock.ticker} stock={stock} />
        ))}
      </div>
      {/* We always render the list cause the error may happen on page 2 for example */}
      {error && <Error error={error} />}
      <LoadMore />
    </div>
  );
};

export default Stocks;
