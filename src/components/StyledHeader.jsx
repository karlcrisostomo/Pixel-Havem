import { Navbar, PhotoCategories, SearchBar } from ".";

const styles = {
  container: `
    h-full 
    bg-[url('/assets/background.jpg')] 
    bg-center 
    p-2 
    bg-no-repeat  
    bg-cover
  `,
  headerStyles: `
    text-center  
    outline-gray-200  
    text-white 
    font-bold 
    max-sm:max-w-xs 
    max-md:max-w-sm 
    rounded-sm 
    xl:max-w-2xl  
    max-sm:text-[3.5rem] 
    p-2    
    text-5xl 
    py-10 
    max-w-xl  
    outline-dotted mx-auto
  `,
};

const StyledHeader = () => {
  return (
    <section className={styles.container}>
      <Navbar />
      <header className={styles.headerStyles}>
        {" "}
        <h1>Elevate Your Visuals with the Best Free Stock Photos & Videos</h1>
      </header>
      <SearchBar />
      <PhotoCategories />
    </section>
  );
};

export default StyledHeader;
