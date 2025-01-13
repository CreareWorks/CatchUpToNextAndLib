import { ToastContainer } from 'react-toastify'
import './globals.css'
import { Playfair_Display } from 'next/font/google'
import ErrorBoundary from '@/components/Error/ErrorBoundary'
import CustomErrorFallback from '@/components/Error/ErrorFallback'
import { Header } from '@/components/Header/Header'
import { SessionProvider } from 'next-auth/react'

const playfair = Playfair_Display({ subsets: ['latin'] })

export const metadata = {
  title: 'FE Catch Up',
  description: 'Front End Catch Up',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={playfair.className}>
        <ErrorBoundary fallback={<CustomErrorFallback/>}>
          <SessionProvider>
            {/* ヘッダー */}
            <Header />
            {/* トースター */}
            <ToastContainer />
            {children}
          </SessionProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
