import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logo } from "../../public/assets";
import Image from "next/image";

const styles = {
  navStyles: `
  bg-black/50
  backdrop-blur-md
  w-full
  text-white
  top-0
  left-0
  `,
  defstyles: `
    fixed  
    px-4 
    py-6   
    right-0  
    top-0 
    left-0 
    z-50 
  `,
  logoBtnStyles: `
    hover:scale-105 
    transition-all 
    duration-200
  `,
};

const LogoComponent = () => {
  const router = useRouter();

  const handleNavigation = useCallback(() => {
    router.push("/");
  }, []);
  return (
    <button className={styles.logoBtnStyles} onClick={() => handleNavigation()}>
      <Image src={logo} width={160} height={160} alt="Pixel Haven's Logo" />
    </button>
  );
};

const Navbar = () => {
  const [ChangeBackground, setChangeBackground] = useState(false);

  useEffect(() => {
    const handleScrollNav = () => {
      if (window.scrollY >= 100) {
        setChangeBackground(true);
      } else {
        setChangeBackground(false);
      }
    };
    window.addEventListener("scroll", handleScrollNav);

    return () => {
      window.removeEventListener("scroll", handleScrollNav);
    };
  }, []);

  return (
    <section className="py-20">
      <div
        className={` ${styles.defstyles}  ${
          ChangeBackground ? styles.navStyles : null
        }`}
      >
        <div className="container mx-auto">
          <LogoComponent />
        </div>
      </div>
    </section>
  );
};

export default Navbar;
