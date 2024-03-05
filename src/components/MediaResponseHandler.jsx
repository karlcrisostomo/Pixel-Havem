import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchDataFromPexels } from "@/api/requestManager";
import { IoArrowDownOutline } from "react-icons/io5";
import { Loader, Modal } from ".";
import { sparkles } from "../../public/assets";

const componentStyles = {
  countContainer: `
    font-medium 
    w-fit rounded-md   
    bg-black
    outline-2    
    mb-4 
    p-4
    text-lg
    text-white
  `,
  defaultButton: `
    py-2
    bg-black
    p-1
    rounded-md 
    max-md:w-[250px]
    md:w-[200px]
    mx-auto
    outline-double
    outline-black/10
    outline-2
    mt-12  
    flex 
    text-white
    justify-center 
    hover:-translate-y-2
    transition-all
    group
    hover:bg-white
    hover:text-black
    hover:shadow-lg
    hover:shadow-orange-600
    tracking-widest
  `,
  disabledButton: `
    pointer-events-none  
    max-md:w-full
    md:w-[250px]
    mx-auto
    outline-double
    outline-2
    outline-gray-300
    p-1 
    rounded-lg  
    flex 
    justify-center 
    bg-gray-200  
    text-gray-600
  `,
  bodyStyle: `overflow-hidden`,
  styledUL: `
    min-[500px]:columns-2  
    xl:columns-4  
    md:columns-3
  `,
  detailsContainer: `
    p-4  
    flex 
    flex-row  
    items-end  
    bg-black/20 
    backdrop-blur-sm 
    absolute 
    w-full 
    h-full 
    top-0 
    left-0 
    right-0 
    bottom-0 
    text-white  
    pointer-events-none 
  `,
  detailsInnerContainer: `
    flex 
    items-center 
    justify-between 
    w-full `,
  downloadBtnContainer: `
    bg-white  
    flex 
    flex-col 
    w-10 
    h-10 
    rounded-lg   
   `,
  downloadInnerContainer: `
    flex  
    justify-center 
    my-auto  
   `,
};

const LoadMore = ({
  initialItem,
  initialData,
  setItem,
  itemId,
  propURL,
  maxItems,
  mediaType,
  onChildData,
}) => {
  let [itemsToShow, setItemsToShow] = useState(initialData);
  const [disableLoadMore, setDisableLoadMore] = useState(false);

  useEffect(() => {
    onChildData(itemsToShow);
  }, [itemsToShow]);

  const handleLoadMore = () => {
    setItemsToShow((prevItems) => prevItems * 2);
  };

  useEffect(() => {
    const fetchFromClientSide = async () => {
      try {
        const apiURL = propURL(itemId, itemsToShow);
        const newData = await fetchDataFromPexels(apiURL, mediaType);

        setItem(newData);

        if (newData.length >= maxItems) {
          setDisableLoadMore(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchFromClientSide();
  }, [itemsToShow, itemId, propURL, setItem]);

  return (
    <section className={`pt-24 ${initialItem.length > 0 ? null : "hidden"}`}>
      <button
        type="button"
        title="load more button"
        className={
          disableLoadMore
            ? componentStyles.disabledButton
            : componentStyles.defaultButton
        }
        onClick={handleLoadMore}
      >
        <div className=" flex gap-2 ">
          <Image
            className=" group-hover:animate-ping  "
            src={sparkles}
            width={25}
            height={25}
            alt="sparkles"
          />
          <span className=" text-[1.3rem] font-medium flex  ">Load More</span>
        </div>
      </button>
    </section>
  );
};

const ScrollBtnComponent = ({ ModalOpen }) => {
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const styledBtn = {
    container: `fixed 
      z-50
    ${ModalOpen ? "hidden " : ""}
      bottom-20 
      left-0 
      right-0 
      bg-gray-900/90 
      w-fit 
      h-fit 
      mx-auto 
      p-4 
      rounded-xl`,

    styledArrow: `
      w-[1em] 
      flex 
      items-center  
      h-[1em] 
      border-r-[0.2em] 
      border-t-[0.2em]  
      border-solid 
      border-white 
      -rotate-45 `,
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 1200) {
        setShowScrollBtn(true);
      } else {
        setShowScrollBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {showScrollBtn && (
        <button className={styledBtn.container} onClick={() => scrollToTop()}>
          <span className={styledBtn.styledArrow} />
        </button>
      )}
    </>
  );
};

const MediaContainer = ({
  item,
  idx,
  isHovered,
  onHover,
  handleImageClick,
  mediaType,
}) => {
  const generateSrcAndAlt = (mediaType) => {
    switch (mediaType) {
      case "photos":
        return { src: item.src.large, alt: item.photographer };
      case "videos":
        return { src: item.image, alt: item.user.name };
      default:
        return { src: "", alt: "" };
    }
  };

  const { src, alt } = generateSrcAndAlt(mediaType);

  return (
    <section className="relative">
      <Image
        priority
        src={src}
        className="w-full cursor-pointer"
        width={300}
        height={300}
        alt={alt}
        onClick={() => handleImageClick(idx)}
        onMouseEnter={onHover}
        onMouseLeave={() => onHover(false)}
      />

      {isHovered && (
        <section className={componentStyles.detailsContainer}>
          <div className={componentStyles.detailsInnerContainer}>
            <h1>{alt}</h1>
            <div className={componentStyles.downloadBtnContainer}>
              <span className={componentStyles.downloadInnerContainer}>
                <IoArrowDownOutline size={32} color="gray" />
              </span>
            </div>
          </div>
        </section>
      )}
    </section>
  );
};

const MediaWrapper = ({
  initialItem,
  isLoading,
  hoveredIndex,
  handleImageClick,
  handleImageHover,
  mediaType,
  isModalOpen,
  selectedItemIndex,
  setModalOpen,
}) => {
  return (
    <section>
      <ul className={componentStyles.styledUL}>
        {initialItem.map((item, idx) => (
          <div key={idx}>
            <li className="py-2">
              {isLoading ? (
                <Loader />
              ) : (
                <MediaContainer
                  item={item}
                  idx={idx}
                  mediaType={mediaType}
                  handleImageClick={handleImageClick}
                  isHovered={hoveredIndex === idx}
                  onHover={(isHovered) => handleImageHover(idx, isHovered)}
                />
              )}

              {isModalOpen && selectedItemIndex === idx && (
                <Modal
                  item={item}
                  onClose={() => setModalOpen(false)}
                  mediaType={mediaType}
                />
              )}
            </li>
          </div>
        ))}
      </ul>
    </section>
  );
};

const MediaResponseHandler = ({
  data,
  initialData,
  itemId,
  propURL,
  mediaType,
}) => {
  const maxItems = 80;

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [initialItem, setItem] = useState(data);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const [numOfItems, setNumOfItems] = useState(null);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (initialItem) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      setLoading(true);
    }
  });
  const handleChildData = (childData) => {
    setNumOfItems(childData ? childData : 0);
  };

  const handleImageClick = (idx) => {
    setSelectedItemIndex(idx);
    setModalOpen(true);
  };

  const handleImageHover = (idx, isHovered) => {
    if (isHovered) {
      setHoveredIndex(idx);
    } else {
      setHoveredIndex(null);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add(componentStyles.bodyStyle);
    } else {
      document.body.classList.remove(componentStyles.bodyStyle);
    }

    return () => {
      document.body.classList.remove(componentStyles.bodyStyle);
    };
  }, [isModalOpen]);

  return (
    <section className=" pb-12">
      <div
        className={`
          ${initialItem.length > 0 ? componentStyles.countContainer : "hidden"}
       `}
      >
        {" "}
        {mediaType.toUpperCase()} {numOfItems}
      </div>
      <MediaWrapper
        initialItem={initialItem}
        mediaType={mediaType}
        isLoading={isLoading}
        hoveredIndex={hoveredIndex}
        handleImageHover={handleImageHover}
        handleImageClick={handleImageClick}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        selectedItemIndex={selectedItemIndex}
      />

      <LoadMore
        initialData={initialData}
        initialItem={initialItem}
        setItem={setItem}
        itemId={itemId}
        mediaType={mediaType}
        propURL={propURL}
        maxItems={maxItems}
        onChildData={handleChildData}
      />

      <ScrollBtnComponent ModalOpen={isModalOpen} />
    </section>
  );
};

export default MediaResponseHandler;
