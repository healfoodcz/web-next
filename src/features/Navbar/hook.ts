import { Locale } from '@/features/Translations'
import { useLocale, useTranslations } from 'next-intl'
import { useMemo } from 'react'
import { NavigationLink, isLinkActive } from './lib'

export function useMainLinks(): NavigationLink[] {
  const t = useTranslations('pages.main')
  const locale = useLocale() as Locale

  return useMemo(
    () => [
      {
        href: '/',
        label: t('home.link'),
        isActive: isLinkActive,
      },
      {
        href: '/catalog',
        label: t('catalog.link'),
        isActive: isLinkActive,
        isNested: true,
      },
      {
        href: '/bookmarks',
        label: t('bookmarks.titleAndLink'),
        isActive: isLinkActive,
      },
      {
        href: '/contact',
        label: t('contact.link'),
        isActive: isLinkActive,
      },
    ],
    [locale, t],
  )
}
