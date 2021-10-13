import "../styles/globals.css";

import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Footer } from "../components/layout/Footer";
import { GoogleAuthManagerProvider } from "../auth/google/google-auth.context";
import { Header } from "../components/layout/Header";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleAuthManagerProvider>
      <ChakraProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ChakraProvider>
    </GoogleAuthManagerProvider>
  );
}
export default MyApp;
