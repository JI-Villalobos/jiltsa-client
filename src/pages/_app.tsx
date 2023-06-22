import { AuthContext, useProviderAuth } from '@/context/AuthContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  const isAuth = useProviderAuth()
   
  return (
    <AuthContext.Provider value={isAuth}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  )
}
