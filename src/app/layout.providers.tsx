'use client'



import { NextUIProvider } from '@nextui-org/react'
import { PropsWithChildren } from 'react'
import { IconContext } from '@phosphor-icons/react'
import { iconsOptions } from '@/lib'
import { ThemeProvider } from 'next-themes'



export function Providers({ children }: PropsWithChildren) {
  return (
    <NextUIProvider>
      <ThemeProvider attribute='class' defaultTheme='light'>
        <IconContext.Provider value={ iconsOptions }>
          { children }
        </IconContext.Provider>
      </ThemeProvider>
    </NextUIProvider>
  )
}
