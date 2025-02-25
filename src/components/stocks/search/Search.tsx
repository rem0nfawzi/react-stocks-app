import { ChangeEvent, useCallback } from "react";
import { useSearchStore } from "../../../store/useSearchStore";
import { fetchStocks } from "../../../lib/stockApis";
import { useStocksStore } from "../../../store/useStocksStors";
import { cn } from "../../../lib/utils";

let timeoutId: ReturnType<typeof setTimeout> | null = null;
const Search = () => {
  const { searchText, setSearchText } = useSearchStore();
  const { setError, setSearchStocks, setLoading } = useStocksStore();

  const handleChange = useCallback(
    (e: ChangeEvent) => {
      const text = (e.target as HTMLInputElement).value;
      setError(null);
      setSearchText(text);
      setSearchStocks({ stocks: [], nextPageUrl: null });
      if (text.length < 3) return;
      setLoading(true);
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fetchStocks(
          `https://api.polygon.io/v3/reference/tickers?search=${text}&active=true&limit=24`
        )
          .then((stocksData) => {
            setSearchStocks({
              stocks: stocksData.list,
              nextPageUrl: stocksData.nextPageUrl,
            });
          })
          .catch((error) => setError(error.message))
          .finally(() => {
            setLoading(false);
          });
        timeoutId = null;
      }, 1000);
    },
    [setError, setLoading, setSearchStocks, setSearchText]
  );
  return (
    <form>
      <input
        value={searchText}
        onChange={handleChange}
        placeholder="Search for stocks"
        className={cn(
          "w-[500px] max-w-full px-6 py-4 mb-8 rounded-xl outline-0 bg-transparent border-2 text-white border-primary-950 placeholder-neutral-200",
          "transition focus:bg-primary-800"
        )}
      />
    </form>
  );
};

export default Search;
