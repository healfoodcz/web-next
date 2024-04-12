import { getTranslations } from 'next-intl/server'
import { getAllCategories, getCategoryById, CategoryParams } from '@/features/Category'
import { LocaleParams } from '@/features/Translations'
import { createTitle } from '@/features/Common/lib'
import PageContent from './page.content'

export async function generateMetadata({ params }: LocaleParams & CategoryParams) {
  const t = await getTranslations({ locale: params.locale, namespace: 'pages' })
  const category = getCategoryById(params.category)

  if (category === undefined) {
    return {
      title: createTitle(t('special.notFound.title')),
      description: t('special.notFound.description'),
    }
  }

  return {
    title: createTitle(category.title[params.locale]),
    description: '',
  }
}

export function generateStaticParams() {
  return getAllCategories().map(({ id }) => ({ category: id }))
}

export default function Page({ params }: LocaleParams & CategoryParams) {
  return <PageContent params={params} />
}
