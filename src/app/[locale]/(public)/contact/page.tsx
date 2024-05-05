import { LocaleParams } from '@/features/Translations'
import { getTranslations } from 'next-intl/server'
import { createTitle } from '@/features/Common/lib'
import PageContent from './page.content'

export async function generateMetadata({ params: { locale } }: LocaleParams) {
  const t = await getTranslations({ locale, namespace: 'pages.main.contact' })

  return {
    title: createTitle(t('title')),
    description: '',
  }
}

export default function Page() {
  return <PageContent />
}
