'use client'

import {
  BreadcrumbItem,
  Breadcrumbs,
  Card,
  CardBody,
  Input,
  Listbox,
  ListboxItem,
  ListboxSection,
  ScrollShadow,
  Select,
  SelectItem,
} from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { Section } from '@/features/Page'
import { ArrowDown, ArrowUp, MagnifyingGlass } from '@phosphor-icons/react'
import { useMemo, useState } from 'react'
import { getAllCategories, CategoryParams, getCategoryById } from '@/features/Category'
import { LocaleParams } from '@/features/Translations'
import { ProductCard } from '@/features/Product'
import clsx from 'clsx'
import { capitalize } from '@/features/Common/lib'

export default function PageContent({ params }: LocaleParams & CategoryParams) {
  const t = useTranslations()
  // const pagesCount = useMemo(
  //   () => Math.ceil(getCategoryById(params.category)!.products.length / 9),
  //   [params.category],
  // )
  const [sort, setSort] = useState('a-z')
  const [search, setSearch] = useState('')
  const products = useMemo(
    () =>
      getCategoryById(params.category)
        ?.products.sort(
          (a, b) => a.title[params.locale].localeCompare(b.title[params.locale]) * (sort === 'a-z' ? +1 : -1),
        )
        .filter((product) => product.title[params.locale].toLowerCase().includes(search.toLowerCase())),
    [params.category, params.locale, sort, search],
  )

  return (
    <Section>
      <ScrollShadow orientation="horizontal" className="w-full">
        <Breadcrumbs className="[&>ol]:flex-nowrap">
          <BreadcrumbItem href="/catalog">{t('pages.main.catalog.link')}</BreadcrumbItem>
          <BreadcrumbItem>
            {capitalize(getCategoryById(params.category)?.title[params.locale] ?? '')}
          </BreadcrumbItem>
        </Breadcrumbs>
      </ScrollShadow>

      <div className="flex flex-col sm:flex-row gap-6">
        <Card className="flex-shrink-0 sm:self-start sm:sticky sm:top-[5.5rem]">
          <CardBody>
            <Listbox aria-label={t('pages.main.catalog.link')} variant="flat">
              <ListboxSection title={t('features.filter.categories')}>
                {getAllCategories().map((category) => (
                  <ListboxItem href={`/catalog/${category.id}`} key={category.id}>
                    <div
                      className={clsx(
                        'flex justify-between gap-4',
                        category.id === params.category ? 'font-bold text-primary' : '',
                      )}
                    >
                      <span>{capitalize(category.title[params.locale])}</span>
                      <span>{category.products.length}</span>
                    </div>
                  </ListboxItem>
                ))}
              </ListboxSection>
            </Listbox>
          </CardBody>
        </Card>

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

          {products?.length === 0 ? (
            <p className="w-full text-center opacity-75">
              {t.rich('features.search.nothingFound', { search, b: (chunks: any) => <b>{chunks}</b> })}
            </p>
          ) : (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products?.map((product) => (
                <ProductCard
                  linkBase={`/catalog/${params.category}`}
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
      </div>
    </Section>
  )
}
