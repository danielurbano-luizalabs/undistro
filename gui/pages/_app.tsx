import '../styles/globals.css'
import { ThemeProvider } from "next-themes";
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (

    <ThemeProvider defaultTheme="dark-mode" themes={["dark-mode"]}>
      <div className="backgroundDefault responsiveScreenHeight">   
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
    
  );
}

export default MyApp
