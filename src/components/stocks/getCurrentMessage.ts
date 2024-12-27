import { Stock } from "../../types/globalTypes";

interface Payload {
  loading: boolean;
  searchText: string;
  searchStocks: {
    stocks: Stock[];
  };
  showSearchedStocks: boolean;
  allStocks: Stock[];
  error: string | null;
}
export const getCurrentMessage = ({
  loading,
  searchText,
  searchStocks,
  showSearchedStocks,
  allStocks,
  error,
}: Payload) => {
  let currentMessage: null | string = null;
  if (error) currentMessage = null;
  else if (loading) currentMessage = "Loading ...";
  else if (searchText.length > 0 && searchText.length < 3)
    currentMessage = "Please enter +3 chararcter to start searching.";
  else if (showSearchedStocks && searchStocks.stocks.length === 0)
    currentMessage = "No results found";
  else if (!showSearchedStocks && allStocks.length === 0)
    currentMessage = "No stocks found";

  return currentMessage;
};
