import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Workspace from "../components/workspace/workspace";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>

      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <ThemeProvider defaultTheme="dark-mode" themes={["dark-mode"]}>
        <Workspace>
          <Component {...pageProps} />
        </Workspace>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
