import { LocaleParams } from '@/features/Translations'
import { getTranslations } from 'next-intl/server'
import { Section } from '@/features/Page'
import { createTitle } from '@/features/Common/lib'

export async function generateMetadata({ params: { locale } }: LocaleParams) {
  const t = await getTranslations({ locale, namespace: 'pages.juridical.privacyPolicy' })

  return {
    title: createTitle(t('titleAndLink')),
    description: '',
  }
}

export default function Page() {
  return (
    <Section>
      <h1 className="text-lg">Catalog</h1>
    </Section>
  )
}
