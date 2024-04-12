import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { Params } from '@/features/Common/lib/next'

export const translations = {
  locales: ['en', 'ru', 'de', 'cs'],
  get defaultLocale() {
    return this.locales[0]
  },
} as const

export type Locale = (typeof translations)['locales'][number]

export type LocaleParams = Params<{ locale: Locale }>

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({
  locales: translations.locales,
})

export default getRequestConfig(async ({ locale }) => {
  if (!translations.locales.includes(locale as Locale)) {
    notFound()
  }

  const translationsModule = await import(`./data/${locale as Locale}.json`)

  return {
    messages: translationsModule.default,
  }
})
