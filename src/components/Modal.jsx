import { handleDownload } from "@/utils/mediaDownloadHandler";
import { useToggleHandler } from "@/utils/useToggleHandler";

import Image from "next/image";

import { useEffect, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Loader from "./Loader";

const StyledModal = {
  container: `
    fixed 
    inset-3
    bg-black/25  
    backdrop-blur-md 
    top-0 
    left-0 
    right-0  
    w-full 
    bottom-0 
    p-10  
    flex 
    flex-col 
    justify-center
    z-50`,
  innerSection: `
    bg-white  
    outline-double
    outline-inner
    outline-2
    outline-offset-2
    outline-white
    p-10
    mx-auto
    rounded-xl
    sm:w-[400px]
    md:w-[500px]
    lg:w-[800px]
    xl:w-[1024px]
    2xl:w-[1068px]
    `,
  modalContent: `
    flex 
    justify-center  
    `,
  itemContainer: `
    flex 
    pb-12
    max-md:flex-col
    max-md:gap-4
    justify-between 
    md:items-center 
    max-md:mb-14
    `,
  imageContainer: `
    md:max-w-sm 
    lg:max-w-sm 
    relative
    `,
  profileContainer: `
    flex  
    items-center 
    gap-5
    `,
  sizeSelectorContainer: `
    absolute 
    right-0
    cursor-pointer 
    border-2 
    w-[300px]
    p-4 
    mt-5 
    rounded-lg 
    bg-white 
    z-50
    shadow-xl
    shadow-gray-400
    `,
  selectedList: `
    py-2 
    flex 
    items-center 
    p-2  
    transition-all 
    duration-200 
    justify-between
    `,
};

const ModalWrapper = ({ children }) => {
  return <section className={StyledModal.container}>{children} </section>;
};

const Profile = ({ item, mediaType }) => {
  return (
    <>
      <Image
        priority
        className="rounded-full aspect-square border-[1px] border-black "
        src={item.src?.original}
        width={32}
        height={32}
        alt={item.photographer}
        quality={75}
      />
    </>
  );
};

const MediaContent = ({ mediaType, item, loading }) => {
  const imageContent = (
    <Image width={500} height={300} alt={item?.alt} src={item.src?.portrait} />
  );

  const videoContent = (
    <video
      width={500}
      height={300}
      className="w-full"
      autoPlay
      muted
      controls
      controlsList="nodownload"
    >
      <source
        src={item.video_files?.find((file) => file.quality === "hd").link}
        type="video/mp4"
      />
    </video>
  );

  return (
    <section className={StyledModal.imageContainer}>
      {loading ? (
        <Loader />
      ) : mediaType === "photos" ? (
        imageContent
      ) : (
        videoContent
      )}
    </section>
  );
};

const SizeSelectorComponent = ({
  sizes,
  selectedSize,
  handleSelectSize,
  mediaType,
}) => {
  const style = {
    highLight: `
      bg-gray-200 
      rounded-md 
      font-medium
      transition-transform
      duration-300
    `,
  };

  const sizeValues = {
    Small: {
      photos: "88x130",
      videos: "960x540",
    },
    Medium: {
      photos: "236x350",
      videos: "1280x720",
    },
    Large: {
      photos: "438x650",
      videos: "1920x1080",
    },
    Portrait: {
      photos: "800x1200",
      videos: null,
    },
    Landscape: {
      photos: "1200x627",
      videos: null,
    },
  };

  return (
    <ul className={StyledModal.sizeSelectorContainer}>
      {sizes.map((size, idx) => (
        <div
          className={` flex transition-all   ${StyledModal.selectedList} ${
            selectedSize === idx ? style.highLight : ""
          }`}
          onClick={() => handleSelectSize(idx)}
        >
          <li key={idx}>{size}</li>
          <div className=" flex items-center gap-2 ">
            <span className="  text-gray-400">
              ({sizeValues[size][mediaType]})
            </span>
            {selectedSize === idx ? (
              <FaRegCheckCircle color="green" size={20} />
            ) : null}
          </div>
        </div>
      ))}
    </ul>
  );
};

const DownloadManager = ({ item, mediaType }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const { handleSelectToggle, isSelectOpen, selectRef } = useToggleHandler();

  const photoSizes = ["Small", "Medium", "Large", "Portrait", "Landscape"];
  const VideoSizes = ["Small", "Medium", "Large"];

  const handleSelectSize = (idx) => {
    setSelectedSize(idx);
  };

  const styles = {
    container: `
      flex 
      items-center
      px-5 
      gap-2     
      bg-black
      to-cobalt-blue   
      font-bold 
      outline-double 
      outline-2 
      outline-black/10 
      w-fit 
      rounded-lg
    
    `,
  };

  const handleLoad = () => {
    if (selectedSize !== null) {
      handleDownload(mediaType, item, selectedSize);
    } else {
      alert("Please select a size before downloading.");
    }
  };

  return (
    <section className="relative" ref={selectRef}>
      <div className={styles.container}>
        <button onClick={handleLoad} className="h-12 rounded-lg text-white">
          Download
        </button>
        <button
          className="border-l-[1px]"
          onClick={(e) => handleSelectToggle(e)}
        >
          <div className="ml-2">
            {isSelectOpen ? (
              <IoIosArrowUp size={20} color="white" />
            ) : (
              <IoIosArrowDown size={20} color="white" />
            )}
          </div>
        </button>
      </div>

      <section>
        {isSelectOpen && (
          <SizeSelectorComponent
            sizes={mediaType === "photos" ? photoSizes : VideoSizes}
            selectedSize={selectedSize}
            handleSelectSize={handleSelectSize}
            mediaType={mediaType}
          />
        )}
      </section>
    </section>
  );
};

const CloseButton = ({ onClose }) => {
  const stylesSpan = {
    base: "w-[2px] bg-black h-7 block",
    rotate45: "rotate-45",
    rotateMinus45: "-rotate-45",
    translateX1: "-translate-x-[1px]",
    translateX3: "-translate-x-[3px]",
  };

  const StyledCloseButton = {
    container: `
      mb-4 
      flex  
      justify-end`,
    closeButton: `
      flex    
      hover:scale-105 
      duration-150 
      items-center   
      transition-all`,
  };

  return (
    <section className={StyledCloseButton.container}>
      <div className=" w-fit">
        <button onClick={onClose} className={StyledCloseButton.closeButton}>
          <span
            className={`${stylesSpan.base} ${stylesSpan.rotate45} ${stylesSpan.translateX1}`}
          />
          <span
            className={`${stylesSpan.base} ${stylesSpan.rotateMinus45} ${stylesSpan.translateX3}`}
          />
        </button>
      </div>
    </section>
  );
};

const Modal = ({ item, onClose, mediaType }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (item) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, []);

  return (
    <ModalWrapper>
      <section className={StyledModal.innerSection}>
        <CloseButton onClose={onClose} />
        <div>
          <div className={StyledModal.itemContainer}>
            <div className={StyledModal.profileContainer}>
              <Profile item={item} />
              <a
                className=" cursor-pointer "
                href={item.photographer_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2>
                  {mediaType === "photos" ? item.photographer : item.user.name}
                </h2>
              </a>
            </div>
            <DownloadManager item={item} mediaType={mediaType} />
          </div>

          <div className={StyledModal.modalContent}>
            <MediaContent mediaType={mediaType} item={item} loading={loading} />
          </div>
        </div>
      </section>
    </ModalWrapper>
  );
};

export default Modal;
