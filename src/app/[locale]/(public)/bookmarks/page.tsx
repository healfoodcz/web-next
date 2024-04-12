import { getTranslations } from 'next-intl/server'
import { LocaleParams } from '@/features/Translations'
import { createTitle } from '@/features/Common/lib'
import PageContent from './page.content'

export async function generateMetadata({ params }: LocaleParams) {
  const t = await getTranslations({ locale: params.locale, namespace: 'pages' })

  return {
    title: createTitle(t('main.bookmarks.titleAndLink')),
  }
}

export default function Page({ params }: LocaleParams) {
  return <PageContent params={params} />
}
