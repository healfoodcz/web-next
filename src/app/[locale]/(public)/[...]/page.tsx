import { useTranslations } from 'next-intl'
import { Section } from '@/features/Page'
import { Link } from '@/features/Translations'
import { Button } from '@nextui-org/react'

export default function Page() {
  const t = useTranslations('pages')

  return (
    <Section className="grow min-h-[75vh] justify-center items-center text-center">
      <h1 className="text-xl">{t('special.notFound.title')}</h1>

      <p className="opacity-70">{t('special.notFound.description')}</p>

      <Link href="/" color="primary">
        <Button color="primary">{t('main.home.link')}</Button>
      </Link>
    </Section>
  )
}
