import '../globals.css'
import { fontPrimary, locale, Params, i18n } from '@/lib'
import { PropsWithChildren } from 'react'
import { unstable_setRequestLocale } from 'next-intl/server'
import { useMessages, NextIntlClientProvider } from 'next-intl'
import { Providers } from './layout.providers'



export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }))
}



export default function RootLayout({ children, params: { locale } }: PropsWithChildren<Params<{ locale: locale }>>) {
  unstable_setRequestLocale(locale)
  const translations = useMessages()

  return (
    <html lang={ locale } suppressHydrationWarning>
      <body className={ fontPrimary.className }>
        <NextIntlClientProvider locale={ locale } messages={ translations }>
          <Providers>
            { children }
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
