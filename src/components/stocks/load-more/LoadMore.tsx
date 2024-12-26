import { LegacyRef } from "react";
import { useLoadMoreStocks } from "./useLoadMoreStocks";

const LoadMore = () => {
  const [ref] = useLoadMoreStocks();
  return <div ref={ref as LegacyRef<HTMLDivElement>} />;
};

export default LoadMore;
