import { LocaleParams } from '@/features/Translations'
import { getTranslations, unstable_setRequestLocale as setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import earth from '@/../public/earth.jpg'
import { Section } from '@/features/Page'
import { createTitle } from '@/features/Common/lib'
import { filterImageProps } from '@/features/Media'

export async function generateMetadata({ params: { locale } }: LocaleParams) {
  const t = await getTranslations({ locale, namespace: 'pages.main.home' })

  return {
    title: createTitle(t('title')),
    description: '',
  }
}

export default function Page({ params }: LocaleParams) {
  setRequestLocale(params.locale)
  // @ts-ignore
  const t = useTranslations('pages.main')

  return (
    <Section
      className="relative text-zinc-50"
      bg={
        // source: https://www.pexels.com/photo/earth-illustration-355935/
        <Image
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.5)' }}
          {...filterImageProps(earth)}
          alt="Earth"
        />
      }
    >
      hi
    </Section>
  )
}
