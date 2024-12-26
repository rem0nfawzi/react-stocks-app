import axios from "axios";
import { Stock } from "../types/globalTypes";

// Define the response type
interface StockResponse {
  results: Stock[];
  status: string;
  next_url: string | null;
}

export const fetchStocks = async (
  apiUrl: string = "https://api.polygon.io/v3/reference/tickers?active=true&limit=24&apiKey=tiLfPn2sjd2dg_f5iwChGMC3szC3GXpY"
) => {
  try {
    const stocksRes = await axios.get<StockResponse>(apiUrl);

    if (!stocksRes.data?.results) {
      throw new Error("Invalid response format: missing results");
    }

    return {
      list: stocksRes.data.results,
      nextPageUrl: stocksRes.data.next_url,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          `Failed to fetch stocks: ${error.response.status} - ${error.response.statusText}`
        );
      }
      throw new Error("Network error: Unable to reach the stocks API");
    }

    // For other types of errors, check if it's an Error instance
    if (error instanceof Error) {
      throw new Error(`Failed to fetch stocks: ${error.message}`);
    }

    // For completely unknown errors
    throw new Error("An unknown error occurred while fetching stocks");
  }
};
