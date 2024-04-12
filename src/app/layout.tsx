import { PropsWithChildren } from 'react'
import { fontPrimary } from '@/features/Common'

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html suppressHydrationWarning>
      <body className={fontPrimary.className}>{children}</body>
    </html>
  )
}
