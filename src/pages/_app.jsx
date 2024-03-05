import { SearchProvider } from "@/context/SearchContext";
import "./globals.css";
import { StyledHeader, StyledLayout, Footer } from "@/components";
import Head from "next/head";

const App = ({ Component, pageProps }) => {
  return (
    <section className=" bg-slate-100  grain">
      <Head>
        <title>PIXELHAVEN</title>
        <meta
          name="description"
          content=">Elevate Your Visuals with the Best Free Stock Photos & Videos "
        />
      </Head>
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
