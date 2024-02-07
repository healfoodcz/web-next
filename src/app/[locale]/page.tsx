import { createTitle, Params, locale } from '@/lib'
import { unstable_setRequestLocale, getTranslations } from 'next-intl/server'
import { Logotype, LanguageSelector, ThemeSelector } from '@/components'



export async function generateMetadata({ params: { locale } }: Params<{ locale: locale }>) {
  const t = await getTranslations({ locale, namespace: 'pages.home' })

  return {
    title: createTitle(t('title')),
    description: ''
  }
}



export default function Home({ params: { locale } }: Params<{ locale: locale }>) {
  unstable_setRequestLocale(locale)

  return (
    <>
      <Logotype/>
      <LanguageSelector/>
      <ThemeSelector/>
    </>
  )
}
