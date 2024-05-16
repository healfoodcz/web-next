'use client'

import { LocaleParams } from '@/features/Translations'
import { notFound } from 'next/navigation'
import { useTranslations } from 'next-intl'
import {
  Card,
  CardBody,
  Button,
  Breadcrumbs,
  BreadcrumbItem,
  ScrollShadow,
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalFooter,
} from '@nextui-org/react'
import { Section } from '@/features/Page'
import {
  getProductById,
  ProductCard,
  removeFromBookmarks,
  addToBookmarks,
  addToVisited,
} from '@/features/Product'
import { getCategoryById } from '@/features/Category'
import React, { useMemo, useState, useEffect } from 'react'
import { Bookmark, Tag } from '@phosphor-icons/react'
import clsx from 'clsx'
import { capitalize } from '@/features/Common'
import { Thumbnail } from '@/features/Media'
import { useAppDispatch, useAppSelector } from '@/features/Store'
import { useDisclosure } from '@nextui-org/use-disclosure'
import { ContactForm } from '@/features/Contact'
import { ProductParams } from './page'

export default function PageContent({ params }: LocaleParams & ProductParams) {
  const t = useTranslations()

  // SSR client-only data
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // product data
  const category = getCategoryById(params.category)
  const product = getProductById(params.product)
  const title = useMemo(
    () => capitalize(product?.title[params.locale] ?? ''),
    [product?.title, params.locale],
  )
  const categoryTitle = useMemo(
    () => capitalize(category?.title[params.locale] ?? ''),
    [category?.title, params.locale],
  )
  const description = useMemo(
    () => (product?.description ? capitalize(product.description[params.locale]) : undefined),
    [product?.description, params.locale],
  )

  // thumbnails
  const [currentThumbnailIndex, setCurrentThumbnailIndex] = useState(0)
  const currentThumbnail = useMemo(
    () => product?.media[currentThumbnailIndex],
    [product?.media, currentThumbnailIndex],
  )
  const [showFullscreenThumbnail, setShowFullscreenThumbnail] = useState(false)

  // bookmarks
  const dispatch = useAppDispatch()
  const bookmarks = useAppSelector((state) => state.bookmarks)
  const isBookmarked = useMemo(() => bookmarks.includes(params.product), [bookmarks, params.product])

  function handleToggleIsBookmarked() {
    if (isBookmarked) {
      dispatch(removeFromBookmarks(params.product))
    } else {
      dispatch(addToBookmarks(params.product))
    }
  }

  // get quote
  const getQuoteModal = useDisclosure()

  // visited
  const visited = useAppSelector((state) => {
    if (!(params.category in state.visited)) {
      return []
    }
    return state.visited[params.category]
  })
  const visitedProducts = useMemo(
    () => visited.map((visitedProductId) => getProductById(visitedProductId)),
    [visited],
  )

  useEffect(() => {
    if (product !== undefined) {
      dispatch(addToVisited([params.category, params.product]))
    }
  }, [dispatch, params.category, params.product, product])

  // handle unmatched product
  if (!category || !product || !currentThumbnail) {
    return notFound()
  }

  return (
    <>
      <Section>
        <ScrollShadow orientation="horizontal" className="w-full">
          <Breadcrumbs className="[&>ol]:flex-nowrap">
            <BreadcrumbItem href="/catalog">{t('pages.main.catalog.link')}</BreadcrumbItem>
            <BreadcrumbItem href={`/catalog/${params.category}`}>{categoryTitle}</BreadcrumbItem>
            <BreadcrumbItem>{title}</BreadcrumbItem>
          </Breadcrumbs>
        </ScrollShadow>

        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <Card className="basis-1/2">
            <CardBody className="flex flex-col gap-4 p-0">
              <Thumbnail
                title={title}
                media={currentThumbnail}
                className="cursor-zoom-in"
                onClick={() => setShowFullscreenThumbnail(true)}
              />
            </CardBody>
          </Card>

          <div className="w-full basis-1/2 flex flex-col sm:flex-col-reverse gap-6">
            <Card>
              <CardBody
                className={clsx(
                  'grid grid-cols-4 gap-4 p-4 flex-shrink-0 overflow-x-auto',
                  product.media.length === 1 ? 'hidden' : '',
                )}
              >
                {product.media.map((media, index) => (
                  <Thumbnail
                    media={media}
                    title={title}
                    className="grid-item h-full cursor-pointer"
                    isActive={currentThumbnailIndex === index}
                    onClick={() => setCurrentThumbnailIndex(index)}
                    key={index}
                  />
                ))}
              </CardBody>
            </Card>

            <Card>
              <CardBody className="flex flex-col gap-4 p-4">
                <div className="flex flex-row gap-4 justify-between items-center">
                  <h1 className="text-2xl font-bold">{title}</h1>

                  {isMounted && (
                    <Button
                      color="default"
                      variant="flat"
                      onClick={handleToggleIsBookmarked}
                      startContent={
                        <Bookmark
                          aria-label={isBookmarked ? 'Forget' : 'Save'}
                          weight={isBookmarked ? 'fill' : 'regular'}
                        />
                      }
                    >
                      {isBookmarked ? t('features.bookmark.saved') : t('features.bookmark.save')}
                    </Button>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <b>{t('features.product.description')}</b>
                  <p className="opacity-70">{description ?? t('features.product.noDescription')}</p>
                </div>

                <div className="flex flex-col gap-1">
                  <b>{t('features.product.price')}</b>
                  <p className="opacity-70">{t('features.product.priceOnRequest')}</p>
                </div>

                <Button color="primary" variant="solid" startContent={<Tag />} onClick={getQuoteModal.onOpen}>
                  {t('features.getQuote.label')}
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </Section>

      {isMounted && visitedProducts.length > 1 /* seems weird to see current product be the only one */ ? (
        <Section>
          <h2 className="text-lg font-bold">{t('features.product.visited')}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {visitedProducts.map((someVisitedProduct, index) => (
              <ProductCard
                className="basis-1/4 flex-grow-0 flex-shrink-0"
                linkBase={`/catalog/${params.category}`}
                locale={params.locale}
                product={someVisitedProduct!}
                key={index}
              />
            ))}
          </div>
        </Section>
      ) : null}

      <Modal
        size="full"
        isOpen={showFullscreenThumbnail}
        onClose={() => setShowFullscreenThumbnail(false)}
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h2 className="text-2xl font-bold">{title}</h2>
              </ModalHeader>
              <ModalBody className="w-full h-full overflow-scroll">
                <Thumbnail
                  title={title}
                  media={currentThumbnail}
                  className="h-full cursor-zoom-out"
                  contain
                  onClick={onClose}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  {t('features.menu.done')}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={getQuoteModal.isOpen}
        onOpenChange={getQuoteModal.onOpenChange}
        hideCloseButton
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{t('features.getQuote.label')}</ModalHeader>

              <ModalBody>
                <ContactForm handleClose={onClose} product={product} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
