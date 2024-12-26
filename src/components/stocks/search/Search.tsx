import { ChangeEvent, useCallback } from "react";
import { useSearchStore } from "../../../store/useSearchStore";
import { fetchStocks } from "../../../lib/stockApis";
import { useStocksStore } from "../../../store/useStocksStors";

let timeoutId: number | null = null;
const Search = () => {
  const { searchText, setSearchText } = useSearchStore();
  const { setError, setSearchStocks, setLoading } = useStocksStore();

  const handleChange = useCallback(
    (e: ChangeEvent) => {
      const text = (e.target as HTMLInputElement).value;
      setSearchText(text);
      if (text.length < 3) return;
      setLoading(true);
      setSearchStocks({ stocks: [], error: null, nextPageUrl: null });
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fetchStocks(
          `https://api.polygon.io/v3/reference/tickers?search=${text}&active=true&limit=24&apiKey=tiLfPn2sjd2dg_f5iwChGMC3szC3GXpY`
        )
          .then((stocksData) => {
            setSearchStocks({
              stocks: stocksData.list,
              error: null,
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
        className="px-6 py-4 rounded-xl w-[500px] max-w-full mb-8 outline-0 bg-transparent border-2 text-white border-neutral-400"
      />
    </form>
  );
};

export default Search;
