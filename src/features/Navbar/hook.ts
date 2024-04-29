import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import { NavigationLink, isLinkActive } from './lib'

export function useMainLinks(): NavigationLink[] {
  const t = useTranslations('pages.main')

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
    [t],
  )
}
