import { LocaleParams } from '@/features/Translations'
import { getProductById, getAllProducts } from '@/features/Product'
import { getTranslations } from 'next-intl/server'
import { createTitle, Params } from '@/features/Common/lib'
import PageContent from './page.content'

export type ProductParams = Params<{
  category: string
  product: string
}>

export async function generateMetadata({ params }: LocaleParams & ProductParams) {
  const t = await getTranslations({ locale: params.locale, namespace: 'pages' })
  const product = getProductById(params.product)

  if (product === undefined) {
    return {
      title: createTitle(t('special.notFound.title')),
      description: t('special.notFound.description'),
    }
  }

  return {
    title: createTitle(product.title[params.locale]),
    description: '',
  }
}

export function generateStaticParams() {
  const products = getAllProducts()

  return products.map(({ id }) => ({ product: id }))
}

export default function Page({ params }: LocaleParams & ProductParams) {
  return <PageContent params={params} />
}
