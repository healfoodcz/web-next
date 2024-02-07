import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { PropsWithChildren } from 'react'
import { Providers } from '@/app/layout.providers'



const inter = Inter({ subsets: [ 'latin' ] })



export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}



export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={ inter.className }>
        <Providers>
          { children }
        </Providers>
      </body>
    </html>
  )
}
