import { PropsWithChildren } from 'react'
import { fontPrimary } from '@/features/Common'
import { Metadata } from 'next'

export const metadata: Metadata = {
  icons: {
    icon: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        url: '/favicon.light.ico',
        media: '(prefers-color-scheme: light)',
      },
      {
        rel: 'icon',
        type: 'image/x-icon',
        url: '/favicon.dark.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
  },
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html suppressHydrationWarning>
      <body className={fontPrimary.className}>{children}</body>
    </html>
  )
}
