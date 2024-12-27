import { Stock } from "../../../types/globalTypes";

interface StockItemProps {
  stock: Stock;
}
const StockItem = ({ stock }: StockItemProps) => {
  return (
    <div
      className="bg-primary-800 rounded-xl py-6 px-8"
      data-testid="stock-item"
    >
      <h3 className="text-lg font-bold text-white">{stock.name}</h3>
      <p className="text-xs text-neutral-200">{stock.ticker}</p>
    </div>
  );
};

export default StockItem;
