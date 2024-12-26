import { LegacyRef } from "react";
import { useLoadMoreStocks } from "./useLoadMoreStocks";

const LoadMore = () => {
  const [ref, loadMoreStocks] = useLoadMoreStocks();
  const { loading, error } = loadMoreStocks;

  return (
    <div ref={ref as LegacyRef<HTMLDivElement>}>
      {loading && <p className="text-white text-center italic">Loading ...</p>}
      {!loading && error && (
        <p className="text-sm font-bold italic text-red-500">{error}</p>
      )}
    </div>
  );
};

export default LoadMore;
