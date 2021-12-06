import "../styles/globals.css";
import "../styles/map.css";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";

import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { theme } from "../styles/theme";
import { BackendAuthProvider } from "@auth/backend/backend-auth-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { GAPIAuthStateContextProvider } from "@auth/gapi/GAPIAuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={new QueryClient()}>
        <BackendAuthProvider>
          <GAPIAuthStateContextProvider>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </GAPIAuthStateContextProvider>
        </BackendAuthProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
