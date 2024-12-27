# Stocks App

I've initialized the app using Vite, chosen react-ts template.
Initialized Tailwind for writing CSS
Zustand for state managment.
Added testing configuration using Jest and React testing library

# Structure

We've two pages

- Home: Which contains Nasdak logo.
- Stocks: In which you can view stocks, load more stocks, and search for any specific stocks.

# Features

- Display stocks in a responsive view.
- Cache stocks per session using Zustand middleware as you can see in "/src/store/useStocksStore.ts", not caching everything because for example we don't need to cach the loading status as it'll be buggy if cached.
- Load more stocks when you scroll down using the intersectionObserver.
- Search with debouncing, so we don't have many API requests.
- Unit tests for both Stocks and Search components.

[Preview link](https://react-stocks-app-tawny.vercel.app/)

Best regards
