import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  photoIcon,
  searchIcon,
  videoIcon,
} from "../../public/assets";
import { useSearchContext } from "@/context/SearchContext";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useToggleHandler } from "@/utils/useToggleHandler";

const icons = [
  { icon: photoIcon, alt: "photo_icon" },
  { icon: videoIcon, alt: "video_icon" },
];

const styles = {
  parentContainer: `
    bg-white
    h-[70px]  
    px-2  
    max-w-sm 
    mx-auto 
    rounded-lg 
    flex 
    items-center
    outline-double
    outline-gray-200
    outline-2
    relative
`,
  inputStyles: `
    bg-transparent 
    outline-none 
    p-2 
    w-full
  `,
  onClickStyle: `
    border-gray-600 
    bg-white 
    border-[1px] 
    transition-all d
    uration-200
  `,
  selectContainer: `
    flex 
    justify-center 
    w-[150px] 
    sm:w-[300px]
  `,
  innerSelect: `
    flex 
    gap-2 
    bg-gray-100
    rounded-md  
    py-2  
    px-2
  `,
  modalContainer: `
    flex 
    flex-col
    items-center 
    justify-center
    gap-2 
    w-[150px]
    bg-white
    h-[100px]  
    top-[4rem]   
    shadow-lg
    shadow-black
    rounded-md 
    py-2 
    absolute
    mt-[1rem]
    left-0  
    z-40 
  `,
  optionsStyles: `
    w-full 
    font-medium
    text-lg
    text-center
    cursor-pointer  
    hover:font-medium  
    transition-transform
    duration-200
    font-blue-600
  `,
  modalItems: `
    flex 
    items-center
    gap-2 justify-center
  
  `,
};

const CategoryIcons = () => {
  const { selectedCategory, options } = useSearchContext().values;
  return (
    <>
      {selectedCategory === options[0] ? (
        <Image src={photoIcon} alt="photo_icon" width={32} height={32} />
      ) : (
        <Image src={videoIcon} alt="video_icon" width={32} height={32} />
      )}
    </>
  );
};

const SearchButton = () => {
  const { values } = useSearchContext();
  return (
    <Image
      onClick={() => values.handleSearch()}
      className="cursor-pointer"
      src={searchIcon}
      width={38}
      alt="search"
    />
  );
};

// const RemoveButton = () => {
//   const { values } = useSearchContext();
//   return (
//     <>
//       {values.searchText && (
//         <button onClick={() => values.handleRemove()}>
//           <Image src={removeIcon} alt="search" />
//         </button>
//       )}
//     </>
//   );
// };

const SelectComponent = () => {
  const { isSelectOpen, selectRef, handleSelectToggle, handleSelectCategory } =
    useToggleHandler();

  const { selectedCategory, options } = useSearchContext().values;

  return (
    <section className={styles.selectContainer}>
      <div className={styles.innerSelect}>
        <div className=" flex gap-2 items-center">
          <CategoryIcons />
          <h1 className="font-medium text-lg  max-sm:hidden  ">
            {selectedCategory}{" "}
          </h1>
        </div>

        <button
          onClick={(e) => handleSelectToggle(e)}
          className="flex items-center"
        >
          {isSelectOpen ? (
            <IoIosArrowDown size={20} />
          ) : (
            <IoIosArrowUp size={20} />
          )}
        </button>
        <section className="   ">
          {isSelectOpen && (
            <ul className={styles.modalContainer} ref={selectRef}>
              {options.map((item, idx) => (
                <li
                  className={`${styles.optionsStyles} ${
                    selectedCategory === item ? " bg-gray-200" : ""
                  }`}
                  key={idx}
                  onClick={() => handleSelectCategory(item)}
                >
                  <div className={styles.modalItems}>
                    {icons[idx] && (
                      <Image
                        src={icons[idx].icon}
                        width={20}
                        height={20}
                        alt={icons[idx].alt}
                      />
                    )}
                    <span>{item}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </section>
  );
};

const SearchBar = () => {
  const { values } = useSearchContext();
  const [isClicked, setClicked] = useState(false);
  const searchBarRef = useRef(null);

  const { selectedCategory } = useSearchContext().values;
  const handleClick = () => {
    setClicked(true);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setClicked(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [setClicked]);

  return (
    <section className="py-12  ">
      <div
        ref={searchBarRef}
        className={` ${styles.parentContainer} 
          ${isClicked ? styles.onClickStyle : null} `}
        onClick={handleClick}
      >
        <SelectComponent />

        <input
          type="text"
          className={styles.inputStyles}
          placeholder={`Search for ${selectedCategory}`}
          value={values.searchText}
          onChange={values.handleChange}
        />
        <SearchButton />
      </div>
    </section>
  );
};

export default SearchBar;
