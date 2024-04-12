'use client'

import { Input, Select, SelectItem } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { Section } from '@/features/Page'
import { ArrowDown, ArrowUp, MagnifyingGlass } from '@phosphor-icons/react'
import { useMemo, useState } from 'react'
import { ProductCard, getProductById, Product } from '@/features/Product'
import { useAppSelector } from '@/features/Store'
import { LocaleParams } from '@/features/Translations'
import { getCategoryByProductId } from '@/features/Category'

export default function PageContent({ params }: LocaleParams) {
  const t = useTranslations()
  const [sort, setSort] = useState('a-z')
  const [search, setSearch] = useState('')
  const bookmarks = useAppSelector((state) => state.bookmarks)
  const products = useMemo(
    () =>
      bookmarks
        .map((productId) => getProductById(productId))
        .filter((product) => product !== undefined)
        .map<Product>((product) => product as Product) // weird typescript casting in the chain
        .sort(
          (a, b) => a.title[params.locale].localeCompare(b.title[params.locale]) * (sort === 'a-z' ? +1 : -1),
        )
        .filter((product) => product.title[params.locale].toLowerCase().includes(search.toLowerCase())),
    [bookmarks, params.locale, search, sort],
  )

  return (
    <Section>
      <h1 className="text-xl font-bold">{t('pages.main.bookmarks.titleAndLink')}</h1>

      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Input
            type="search"
            size="sm"
            placeholder={t('features.search.label')}
            aria-label={t('features.search.label')}
            startContent={<MagnifyingGlass aria-label={t('features.search.label')} size="20" />}
            value={search}
            onValueChange={(value) => setSearch(value)}
            isClearable
            onClear={() => setSearch('')}
          />

          <Select
            className="sm:max-w-56 flex-nowrap items-center"
            label={t('features.sort.label')}
            size="sm"
            selectionMode="single"
            disallowEmptySelection
            startContent={
              sort === 'a-z' ? (
                <ArrowDown size="20" aria-label={t('features.alphabeticalSort.aZ')} />
              ) : (
                <ArrowUp size="20" aria-label={t('features.alphabeticalSort.zA')} />
              )
            }
            selectedKeys={[sort]}
            onChange={(e) => setSort(e.target.value)}
          >
            <SelectItem
              startContent={<ArrowDown aria-label={t('features.alphabeticalSort.aZ')} />}
              value="a-z"
              key="a-z"
            >
              {t('features.alphabeticalSort.aZ')}
            </SelectItem>
            <SelectItem
              startContent={<ArrowUp aria-label={t('features.alphabeticalSort.zA')} />}
              value="z-a"
              key="z-a"
            >
              {t('features.alphabeticalSort.zA')}
            </SelectItem>
          </Select>
        </div>

        {search && products?.length === 0 ? (
          <p className="w-full text-center opacity-75">
            {t.rich('features.search.nothingFound', { search, b: (chunks: any) => <b>{chunks}</b> })}
          </p>
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* TODO: handle no bookmarks with appropriate text */}
            {products?.map((product) => (
              <ProductCard
                linkBase={`/catalog/${getCategoryByProductId(product.id)?.id}`}
                locale={params.locale}
                product={product}
                key={product.id}
              />
            ))}
          </div>
        )}

        {/* <div className="flex flex-row justify-center">
          {pagesCount > 1 && <Pagination total={pagesCount} initialPage={1} />}
        </div> */}
      </div>
    </Section>
  )
}