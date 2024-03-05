import { useSearchContext } from "@/context/SearchContext";
import { useCallback, useState, useRef, useEffect } from "react";

export const useToggleHandler = () => {
  const [isSelectOpen, setSelectOpen] = useState(false);
  const selectRef = useRef(null);
  const { setSelectedCategory } = useSearchContext().values;

  const handleSelectToggle = (e) => {
    e.stopPropagation();
    setSelectOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setSelectOpen(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [setSelectOpen]);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    // setSelectOpen(false);
  };

  return {
    handleSelectToggle,
    selectRef,

    isSelectOpen,
    setSelectOpen,
    handleSelectCategory,
  };
};
