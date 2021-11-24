import "../styles/globals.css";

import { SessionProvider } from "next-auth/react";

import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { theme } from "../styles/theme";
import { BackendAuthProvider } from "@auth/backend/backend-auth-context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={pageProps.session}>
        <BackendAuthProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </BackendAuthProvider>
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;
