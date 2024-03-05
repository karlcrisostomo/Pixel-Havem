const styles = {
  container: `
    border-t-2
    container 
    mx-auto`,
  inner: `
    flex 
    max-md:flex-col  
    md:items-center
    justify-between
  `,
  paragraphStyles: `
    py-4 
    flex 
    items-center 
    max-lg:gap-0
    lg:gap-4`,
  spanStyles: `
    max-lg:hidden
    w-2 
    h-2 
    block 
    animate-ping 
    bg-black 
    rounded-full
    `,
};
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <section className={styles.container}>
      <div className={styles.inner}>
        <p className={styles.paragraphStyles}>
          PIXELHAVEN - &copy; {currentYear} All Rights Reserved
          <span className={styles.spanStyles}></span>
        </p>
        <span>
          made with<span className=" text-red-50  "> &#10084;</span> by Karl
          Crisostomo
        </span>
      </div>
    </section>
  );
};

export default Footer;
