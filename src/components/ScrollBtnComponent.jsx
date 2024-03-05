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

    arrowStyles: `
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
          <span className={styledBtn.arrowStyles} />
        </button>
      )}
    </>
  );
};

export default ScrollBtnComponent;
