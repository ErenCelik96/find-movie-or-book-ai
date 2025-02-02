import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Film veya Kitap Keşfet',
  description: 'AI destekli film ve kitap arama uygulaması',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body 
        className={inter.className}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  )
} 