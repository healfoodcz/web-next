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

// TODO: cookies notice (or include the link to the appropriate information in the footer)

// TODO: Google Gemini (https://gemini.google.com/app/99bd698714869264)
//  Here are some key aspects to consider for making a legal website for a Czech company:
//  General Legal Compliance:
//      - Imprint: Include a clearly visible imprint page with the company's legal name, address, registration
//      number, contact information, and VAT number (if applicable).
//      - Terms and Conditions: Create clear and concise terms and conditions outlining the website's use,
//      limitations, and user responsibilities. Ensure these comply with Czech consumer protection laws and
//      EU regulations like GDPR.
//      - Privacy Policy: Implement a detailed privacy policy explaining how you collect, store, and use user
//      data. Ensure compliance with GDPR and obtain user consent for data processing where required.
//      Intellectual Property: Clearly state ownership of website content (text, images, etc.) and any
//      applicable copyright or trademark restrictions.
//      - Cookies: If using cookies, inform users about their purpose and obtain consent before using them.
//      Comply with cookie regulations set out by the EU ePrivacy Directive.
//  Additional Considerations:
//      - Language: If targeting international audiences, consider offering the website in multiple languages,
//      ensuring legal information is translated accurately.
//      - Accessibility: Make the website accessible for users with disabilities, following Czech
//      accessibility standards and WCAG guidelines.
//      - E-commerce: If selling products or services online, comply with e-commerce laws regarding product
//      information, payment methods, delivery, and returns.
//      - Data Security: Implement appropriate security measures to protect user data from unauthorized access
//      or breaches.
//  Resources:
//      Czech Ministry of Justice: https://justice.cz/ (English section available)
//      Czech Data Protection Authority: https://uoou.gov.cz/en (English section available)
//      EU General Data Protection Regulation (GDPR):
//      https://commission.europa.eu/law/law-topic/data-protection_en
//  Disclaimer: This information is for general guidance only and does not constitute legal advice. It is
//  recommended to consult with a lawyer experienced in Czech law for specific advice tailored to your
//  website and company needs.

// TODO: OpenAI ChatGPT (https://chat.openai.com/c/a865ddc0-2439-4b2b-83a7-33b85eeebe25)
//  Creating a legal website for a Czech company involves several important steps to ensure compliance
//  with relevant laws and regulations. Here's a general guideline:
//     - Terms and Conditions (Obchodní podmínky): Draft clear and comprehensive terms and conditions that
//     outline the terms of use for visitors to your website. Include information about products or services
//     offered, pricing, payment terms, delivery, returns, warranties, and any other relevant policies.
//     - Privacy Policy (Zásady ochrany osobních údajů): Create a privacy policy that explains how you
//     collect,  use, store, and protect personal data of visitors to your website, in accordance with
//     the General Data
//     Protection Regulation (GDPR) and Czech data protection laws.
//     - Cookie Consent (Souhlas s používáním cookies): Obtain consent from website visitors for the use
//     of cookies, as required by the EU Cookie Law (ePrivacy Directive). Provide information about
//     the types of cookies used, their purpose, and how visitors can manage or disable them.
//     - Impressum (Oznámení o provozovateli): Include an "Impressum" or "Oznámení o provozovateli" page
//     with details about the company, including its name, address, contact information, and registration
//     details (e.g., company registration number, VAT number).
//     - Copyright Notice (Oznámení o autorských právech): Display a copyright notice on your website to
//     protect your intellectual property rights. This notice should specify the copyright owner and the year
//     of publication.
//     - Accessibility Compliance (Přístupnost webu): Ensure that your website complies with accessibility
//     standards, making it accessible to all users, including those with disabilities. This may involve
//     following the Web Content Accessibility Guidelines (WCAG).
//     - E-commerce Compliance (E-commerce): If you're selling products or services online, comply with
//     e-commerce regulations, including providing clear pricing, product descriptions, terms of sale,
//     and information about consumer rights.
//     - Legal Disclaimers (Ochrana proti právním následkům): Include any necessary legal disclaimers to
//     limit liability and clarify the scope of your website's content or services.
//     - GDPR Compliance (Ochrana osobních údajů): Ensure that your website is GDPR compliant by implementing
//     measures to protect the personal data of visitors, such as obtaining consent for data processing,
//     providing data subject rights, and implementing security measures.
//     - Consultation with Legal Experts (Konzultace s právními odborníky): Consider consulting with legal
//     experts or lawyers specializing in internet law to ensure that your website meets all legal
//     requirements and is properly protected against potential legal risks.
//  By addressing these key legal aspects, you can create a website for your Czech company that complies
//  with relevant laws and regulations, helping to build trust with your customers and minimize legal
//  risks. However, keep in mind that this is not exhaustive legal advice, and you may need to seek guidance
//  from legal professionals for specific legal matters.

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
            <CardBody className="flex flex-col gap-4">
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
                  'grid grid-cols-4 gap-4 flex-shrink-0 overflow-x-auto',
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
              <CardBody className="flex flex-col gap-4">
                <div className="flex flex-row gap-4 justify-between items-center">
                  <h1 className="text-2xl font-bold">{title}</h1>

                  {isMounted && (
                    <Button
                      color="default"
                      variant="flat"
                      onClick={handleToggleIsBookmarked}
                      endContent={
                        <Bookmark
                          aria-label={isBookmarked ? 'Forget' : 'Save'}
                          weight={isBookmarked ? 'fill' : 'regular'}
                        />
                      }
                    >
                      {isBookmarked ? t('features.bookmark.forget') : t('features.bookmark.save')}
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
