import { AppProviders } from '@/contexts'
import type { AppProps } from 'next/app'
import '@/styles/globals.css'

function UndistroDashBoard({ Component, pageProps }: AppProps) {
  return (
    <AppProviders>
      <div className="backgroundDefault responsiveScreenHeight">
        <Component {...pageProps} />
      </div>
    </AppProviders>
  )
}

export default UndistroDashBoard
