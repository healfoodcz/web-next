import '../globals.css'
import { translations, LocaleParams } from '@/features/Translations'
import { PropsWithChildren } from 'react'
import { unstable_setRequestLocale as setRequestLocale } from 'next-intl/server'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { Providers } from './layout.providers'
import WebVitals from './layout.web-vitals'

export function generateStaticParams() {
  return translations.locales.map((locale) => ({ locale }))
}

export default function Layout({ children, params }: PropsWithChildren<LocaleParams>) {
  setRequestLocale(params.locale)
  const allTranslations = useMessages()

  return (
    <div lang={params.locale}>
      <WebVitals />
      <NextIntlClientProvider locale={params.locale} messages={allTranslations}>
        <Providers params={params}>{children}</Providers>
      </NextIntlClientProvider>
    </div>
  )
}
