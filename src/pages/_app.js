import { SearchProvider } from "@/context/SearchContext";
import "./globals.css";
import { StyledHeader, StyledLayout, Footer } from "@/components";

const App = ({ Component, pageProps }) => {
  return (
    <section className="">
      <SearchProvider>
        <StyledHeader />
        <StyledLayout>
          <Component {...pageProps} />
          <Footer />
        </StyledLayout>
      </SearchProvider>
    </section>
  );
};

export default App;
