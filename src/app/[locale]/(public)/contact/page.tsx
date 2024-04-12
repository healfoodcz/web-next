import { LocaleParams } from '@/features/Translations'
import { getTranslations } from 'next-intl/server'
import Section from '@/features/Page/Section'
import { createTitle } from '@/features/Common/lib'

export async function generateMetadata({ params: { locale } }: LocaleParams) {
  const t = await getTranslations({ locale, namespace: 'pages.main.contact' })

  return {
    title: createTitle(t('title')),
    description: '',
  }
}

export default function Page() {
  return (
    <Section>
      <h1 className="text-lg">Contact</h1>
    </Section>
  )
}
