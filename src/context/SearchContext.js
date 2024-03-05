import {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
  
const SearchContext = createContext();

export function useSearchContext() {
  return useContext(SearchContext);
}
export const SearchProvider = ({ children }) => {
  const [searchText, setSearchText] = useState("");
  const options = ["Photos", "Videos"];
  const [selectedCategory, setSelectedCategory] = useState(options[0]);

  const router = useRouter();

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handlePageNavigation = useCallback(
    (query) => {
      const toggleSelect = selectedCategory.toLowerCase();
      router.push(`/${toggleSelect}/${encodeURIComponent(query)}`);
    },
    [selectedCategory]
  );

  const handleSearch = useCallback(() => {
    const trimmedSearchText = searchText.trim();

    if (trimmedSearchText !== "") {
      handlePageNavigation(trimmedSearchText);
    } else {
      console.warn("Please enter a search term.");
    }
  }, [searchText, router, selectedCategory]);

  const handleRemove = () => {
    setSearchText("");
  };

  useEffect(() => {
    // Check if "Enter" key was pressed
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [searchText, selectedCategory]);

  const values = useCallback(
    {
      searchText,
      options,
      handlePageNavigation,
      selectedCategory,
      setSelectedCategory,
      handleChange,
      handleSearch,
      handleRemove,
    },
    [
      searchText,
      options,
      handlePageNavigation,
      selectedCategory,
      setSelectedCategory,
      handleChange,
      handleSearch,
      handleRemove,
    ]
  );
  return (
    <SearchContext.Provider value={{ values }}>
      {children}
    </SearchContext.Provider>
  );
};
