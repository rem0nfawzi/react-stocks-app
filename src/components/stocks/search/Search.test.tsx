import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Search from "./Search";
import { useStocksStore } from "../../../store/useStocksStors";
import { fetchStocks } from "../../../lib/stockApis";

// Mocks
jest.mock("../../../store/useStocksStors");
jest.mock("../../../lib/stockApis");

const mockSetError = jest.fn();
const mockSetSearchStocks = jest.fn();
const mockSetLoading = jest.fn();

// Mock the fetchStocks function
jest.mock("../../../lib/stockApis", () => ({
  fetchStocks: jest.fn(async () => true),
}));

(useStocksStore as unknown as jest.Mock).mockReturnValue({
  setError: mockSetError,
  setSearchStocks: mockSetSearchStocks,
  setLoading: mockSetLoading,
});

describe("<Search />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Renders the search input, and changes value properly", async () => {
    render(<Search />);
    const input = screen.getByPlaceholderText("Search for stocks");

    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "SEARCH_TEXT" } });
    expect(input).toHaveValue("SEARCH_TEXT");
  });

  it("Resets error and stocks on change", async () => {
    render(<Search />);
    const input = screen.getByPlaceholderText("Search for stocks");
    fireEvent.change(input, { target: { value: "R" } });
    expect(mockSetError).toHaveBeenCalledWith(null);
    expect(mockSetSearchStocks).toHaveBeenCalledWith({
      stocks: [],
      nextPageUrl: null,
    });
  });

  it("Calls fetch stocks only when character are +3", async () => {
    render(<Search />);
    const input = screen.getByPlaceholderText("Search for stocks");

    // fetchStocks isn't called when input has 1 character
    fireEvent.change(input, { target: { value: "R" } });
    expect(fetchStocks).not.toHaveBeenCalled();

    fireEvent.change(input, { target: { value: "MORE_CHARS" } });

    // fetchStocks is called when input has +3 character
    // waitFor is used because we've a timeout of 1 second before calling fetchStocks, which is used for debouncing
    await waitFor(
      () => {
        expect(input).toHaveValue("MORE_CHARS");
        expect(fetchStocks).toHaveBeenCalled();
      },
      {
        timeout: 2000,
      }
    );
  });
});
