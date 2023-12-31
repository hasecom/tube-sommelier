import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import metaConst from '@/assets/constants/metaConst';
import HeaderComponent from '@/components/headerComponent';
import { Providers } from "@/assets/chakra/providers";
import { AppProvider } from "@/providers/appProvider";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: metaConst.title,
  description: metaConst.description
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`bg-gray-100 min-h-screen ${inter.className}`}>
      <AppProvider>
        <Providers>
          <HeaderComponent {...metaConst} />
            {children}
        </Providers>
      </AppProvider>
      </body>
    </html>
  )
}
