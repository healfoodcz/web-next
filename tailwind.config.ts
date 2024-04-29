import type { Config as TailwindConfig } from 'tailwindcss'
import { nextui } from '@nextui-org/react'
import typography from '@tailwindcss/typography'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              // foreground: '#FFFFFF',
              // DEFAULT: '#2CA647',
              DEFAULT: '#12A150',
              50: '#E8FAF0',
              100: '#D1F4E0',
              200: '#A2E9C1',
              300: '#74DFA2',
              400: '#45D483',
              500: '#17C964',
              600: '#12A150',
              700: '#0E793C',
              800: '#095028',
              900: '#052814',
            },
          },
        },
        dark: {
          colors: {
            primary: {
              // foreground: '#FFFFFF',
              // DEFAULT: '#2CA647',
              DEFAULT: '#12A150',
              50: '#E8FAF0',
              100: '#D1F4E0',
              200: '#A2E9C1',
              300: '#74DFA2',
              400: '#45D483',
              500: '#17C964',
              600: '#12A150',
              700: '#0E793C',
              800: '#095028',
              900: '#052814',
            },
          },
        },
      },
    }),
    typography,
  ],
} satisfies TailwindConfig
