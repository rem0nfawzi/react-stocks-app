import Home from "./components/home/Home";
import { BrowserRouter, Route, Routes } from "react-router";
import Stocks from "./components/stocks/Stocks";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stocks" element={<Stocks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
