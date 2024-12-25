import { useSearchStore } from "../../../store/useSearchStore";

let timeoutId: number | null = null;
const Search = () => {
  const { searchText, setSearchText } = useSearchStore();
  return (
    <form>
      <input
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          if (timeoutId) clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            console.log("CALL_API");
          }, 1000);
        }}
        placeholder="Search for stocks"
        className="px-6 py-4 rounded-xl w-[500px] max-w-full mb-8 outline-0 bg-transparent border-2 text-white border-neutral-400"
      />
    </form>
  );
};

export default Search;
