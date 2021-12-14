import { AppProviders } from '@/contexts'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import { CheckAuthRoute } from '@/components/AuthRoute/AuthRoute'

function UndistroDashBoard({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <AppProviders>
      <SessionProvider session={session}>
        <div className="backgroundDefault responsiveScreenHeight">
          <CheckAuthRoute>
            <Component {...pageProps} />
          </CheckAuthRoute>
        </div>
      </SessionProvider>
    </AppProviders>
  )
}

export default UndistroDashBoard
