import "../styles/globals.css";

import type { AppProps } from "next/app";
import { GoogleAuthManagerProvider } from "../auth/google/google-auth.context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleAuthManagerProvider>
      <Component {...pageProps} />
    </GoogleAuthManagerProvider>
  );
}
export default MyApp;
