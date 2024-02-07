'use client'



import { NextUIProvider } from '@nextui-org/react'
import { PropsWithChildren } from 'react'
import { IconContext } from '@phosphor-icons/react'
import { iconsOptions, useRouter } from '@/lib'
import { ThemeProvider } from 'next-themes'



export function Providers({ children }: PropsWithChildren) {
  const router = useRouter()

  return (
    <NextUIProvider navigate={ router.push }>
      <ThemeProvider attribute='class' defaultTheme='light' /* TODO: make default system */>
        <IconContext.Provider value={ iconsOptions }>
          { children }
        </IconContext.Provider>
      </ThemeProvider>
    </NextUIProvider>
  )
}
