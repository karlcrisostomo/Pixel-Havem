import { useRef, useState, useEffect } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { categoryList } from "@/constant";
import { useSearchContext } from "@/context/SearchContext";

const styles = {
  container: `
    container 
    mx-auto 
    relative 
    overflow-hidden 
    flex 
    items-center
  `,
  sliderContainer: `
   p-6
    flex 
    gap-5 
    customScroll 
    scroll-smooth
  `,
  sliderContent: `
    max-lg:w-full 
    w-[300px] 
    cursor-pointer 
    hover:bg-black
    hover:text-white
    transition-transform
    hover:outline-double
    hover:outline-2
    hover:outline-white/50
    px-4 
    text-center 
    text-lg 
    rounded-md 
    text-nowrap 
    p-2 
    bg-white
  `,
};

const getButtonStyles = (position) => {
  return `
    backdrop-blur-sm 
    absolute 
    ${position}-0 z-10
  
`;
};

const PhotoCategories = () => {
  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const { handlePageNavigation } = useSearchContext().values;

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollPosition(containerRef.current.scrollLeft);
      }
    };

    containerRef.current.addEventListener("scroll", handleScroll);

    const totalWidth = containerRef.current?.scrollWidth || 0;
    const containerWidth = containerRef.current?.clientWidth || 0;
    setMaxScroll(totalWidth - containerWidth);

    return () => {
      containerRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  const scrollToFirstIndex = () => {
    handleScroll(-scrollPosition);
  };

  const scrollToLastIndex = () => {
    handleScroll(maxScroll);
  };

  const handleScroll = (scrollAmount) => {
    if (containerRef.current) {
      const newScrollPosition = containerRef.current.scrollLeft + scrollAmount;
      containerRef.current.scrollLeft = newScrollPosition;
    }
  };

  return (
    <section className={styles.container}>
      <button
        className={`${getButtonStyles("left")} ${
          scrollPosition === 0 ? "hidden" : ""
        }`}
        onClick={scrollToFirstIndex}
      >
        <MdKeyboardArrowLeft size={32} />
      </button>
      <button
        className={`${getButtonStyles("right")} ${
          scrollPosition >= maxScroll ? " hidden" : ""
        }`}
        onClick={scrollToLastIndex}
      >
        <MdKeyboardArrowRight size={32} />
      </button>

      <ul className={styles.sliderContainer} ref={containerRef}>
        {categoryList.map((item, idx) => (
          <li
            key={idx}
            className={styles.sliderContent}
            onClick={() => handlePageNavigation(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PhotoCategories;
