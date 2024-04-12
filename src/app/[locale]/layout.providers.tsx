'use client'

import { PropsWithChildren } from 'react'
import { ThemeProvider } from 'next-themes'
import { Provider } from 'react-redux'
import { NextUIProvider } from '@nextui-org/react'
import { IconContext } from '@phosphor-icons/react'
import { useRouter, LocaleParams } from '@/features/Translations'
import { LanguageModalProvider } from '@/features/Language'
import { ThemeModalProvider } from '@/features/Theme'
import { iconsOptions } from '@/features/Common/lib'
import { store, persistor } from '@/features/Store'
import { PersistGate } from 'redux-persist/integration/react'

export function Providers({ children, params }: PropsWithChildren<LocaleParams>) {
  const router = useRouter()

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NextUIProvider navigate={router.push}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <IconContext.Provider value={iconsOptions}>
              <LanguageModalProvider locale={params.locale}>
                <ThemeModalProvider>{children}</ThemeModalProvider>
              </LanguageModalProvider>
            </IconContext.Provider>
          </ThemeProvider>
        </NextUIProvider>
      </PersistGate>
    </Provider>
  )
}
