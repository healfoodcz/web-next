import { Inter, Patua_One as PatuaOne } from 'next/font/google'

export const fontPrimary = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'block',
  preload: true,
})

export const fontLogo = PatuaOne({
  subsets: ['latin'],
  weight: '400',
  display: 'block',
  preload: true,
})
