import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { Params } from '@/lib/next'

export const i18n = {
  locales: ['en', 'ru', 'de', 'cs'],
  get defaultLocale() {
    return this.locales[0]
  },
} as const

export type locale = (typeof i18n)['locales'][number]

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({
  locales: i18n.locales
})
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({
    locales: i18n.locales,
  })

export default getRequestConfig(async ({ locale }) => {
  if (!i18n.locales.includes(locale as locale)) notFound()

  return {
    messages: (await import(`../translations/${locale}.json`)).default,
  }
})
