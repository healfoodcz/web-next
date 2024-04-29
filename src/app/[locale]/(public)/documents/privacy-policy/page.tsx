import React from 'react'
import { LocaleParams } from '@/features/Translations'
import { createTitle } from '@/features/Common'
import { getTranslations } from 'next-intl/server'
import PageContent from './page.content'

export async function generateMetadata({ params: { locale } }: LocaleParams) {
  const t = await getTranslations({ locale, namespace: 'pages.juridical.privacyPolicy' })

  return {
    title: createTitle(t('titleAndLink')),
    description: '',
  }
}

export default function Page({ params }: LocaleParams) {
  return <PageContent params={params} />
}
