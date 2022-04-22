import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../chakra/theme";
import Layout from "../components/Layout/Layout";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // wrap App in recoil library
    <RecoilRoot>
      {/* // set up the ChakraProvider at the root of your application. */}
      {/* // ! Chakra throws a warning in the console, need to update Chakra in the future maybe */}
      <ChakraProvider theme={theme}>
        {/* wrapping our App in Layout so that the Navbar is on every page */}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default MyApp;
