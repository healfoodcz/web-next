import { Locale, Link } from '@/features/Translations'
import { Product } from '@/features/Product'
import { Card, CardBody, CardFooter } from '@nextui-org/react'
import { useMemo } from 'react'
import clsx from 'clsx'
import { capitalize } from '@/features/Common/lib'
import { Thumbnail } from '@/features/Media'

interface ProductProps {
  linkBase: string
  locale: Locale
  product: Product
  className?: string
}

export default function ProductCard({ linkBase, product, locale, className = '' }: ProductProps) {
  const title = useMemo(() => capitalize(product.title[locale]), [locale, product.title])

  return (
    <Link href={`${linkBase}/${product.id}`} className={clsx('rounded-xl', className)}>
      <Card shadow="md" radius="lg">
        <CardBody className="p-0" aria-valuetext={title}>
          <Thumbnail media={product.media[0]} title={title} isActive={false} />
        </CardBody>
        <CardFooter className="flex flex-col gap-2 text-small items-start">
          <b>{title}</b>
          {/* additionalInformation && <p className="text-default-500">{additionalInformation}</p> */}
        </CardFooter>
      </Card>
    </Link>
  )
}
