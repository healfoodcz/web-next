import { Locale } from '@/features/Translations'
import { Products } from './model'
import ProductCard from './ProductCard'

interface ProductCardsGridProps {
  linkBase: string
  products: Products
  locale: Locale
}

export default function ProductCardsGrid({ linkBase, products, locale }: ProductCardsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard linkBase={linkBase} product={product} key={product.id} locale={locale} />
      ))}
    </div>
  )
}
