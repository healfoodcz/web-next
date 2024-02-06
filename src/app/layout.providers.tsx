'use client'



import { NextUIProvider } from '@nextui-org/react'
import { PropsWithChildren } from 'react'
import { IconContext } from '@phosphor-icons/react'
import { iconsOptions } from '@/lib'



export function Providers({ children }: PropsWithChildren) {
  return (
    <NextUIProvider>
      <IconContext.Provider value={ iconsOptions }>
        { children }
      </IconContext.Provider>
    </NextUIProvider>
  )
}
