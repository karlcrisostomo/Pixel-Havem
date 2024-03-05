import React from "react";

const StyledLayout = ({ children }) => {
  return (
    <section className=" container mx-auto max-md:p-4 md:p-2 py-10 mt-12">
      {children}
    </section>
  );
};

export default StyledLayout;
