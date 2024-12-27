import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Stocks from "./Stocks";
import { useStocksStore } from "../../store/useStocksStors";
jest.mock("./load-more/LoadMore", () => {
  return {
    __esModule: true,
    A: true,
    default: () => <div>Hi</div>,
  };
});

jest.mock("../../store/useStocksStors");
(useStocksStore as unknown as jest.Mock).mockReturnValue({
  stocks: [],
  searchStocks: {
    stocks: [],
    nextPageUrl: null,
  },
  error: null,
  loading: false,
  loadMoreStocks: [],
  setStocks: jest.fn(),
  setError: jest.fn(),
  setLoading: jest.fn(),
});

describe("<Stocks />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("It shows 'No items found' when there's no stocks resulted", async () => {
    render(<Stocks />);
    const msgParagraph = screen.getByTestId("current-msg");
    expect(msgParagraph).toBeInTheDocument();
    expect(msgParagraph).toHaveTextContent("No stocks found");
  });

  it("Renders the proper number of stocks", async () => {
    (useStocksStore as unknown as jest.Mock).mockReturnValue({
      stocks: [
        {
          name: "STOCK 1",
          ticker: "AAPL 1",
          active: true,
        },
        {
          name: "STOCK 2",
          ticker: "AAPL 2",
          active: true,
        },
        {
          name: "STOCK 3",
          ticker: "AAPL 3",
          active: true,
        },
      ],
      searchStocks: {
        stocks: [],
        nextPageUrl: null,
      },
      error: null,
      loading: false,
      loadMoreStocks: [],
      setStocks: jest.fn(),
      setError: jest.fn(),
      setLoading: jest.fn(),
    });
    render(<Stocks />);

    // No message cause we already loaded stocks
    const msgParagraph = screen.queryByTestId("current-msg");
    expect(msgParagraph).not.toBeInTheDocument();

    // Should load 3 stocks
    const stocks = screen.getAllByTestId("stock-item");
    expect(stocks).toHaveLength(3);
  });
});
