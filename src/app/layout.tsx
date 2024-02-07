import './globals.css'
import { PropsWithChildren } from 'react'
import { Providers } from '@/app/layout.providers'
import { fontPrimary } from '@/lib'



export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={ fontPrimary.className }>
        <Providers>
          { children }
        </Providers>
      </body>
    </html>
  )
}
