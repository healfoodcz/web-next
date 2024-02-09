import { Inter, Patua_One } from 'next/font/google'

export const fontPrimary = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  preload: true,
})

export const fontLogo = Patua_One({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  preload: true,
})
