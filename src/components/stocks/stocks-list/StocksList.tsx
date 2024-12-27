import { cn } from "../../../lib/utils";
import { Stock } from "../../../types/globalTypes";
import StockItem from "../stock-item/StockItem";

interface StocksListProps {
  stocks: Stock[];
}
const StocksList = ({ stocks }: StocksListProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 mb-6",
        "sm:grid-cols-2 md:grid-cols-3"
      )}
    >
      {stocks.map((stock: Stock) => (
        <StockItem key={stock.ticker} stock={stock} />
      ))}
    </div>
  );
};

export default StocksList;
