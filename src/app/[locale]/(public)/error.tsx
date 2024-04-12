'use client'

import { Section } from '@/features/Page'
import { Button } from '@nextui-org/react'
import { useEffect } from 'react'
import { useTranslations } from 'next-intl'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  const t = useTranslations('pages.special.error')

  useEffect(() => {
    // TODO report(logs)
    console.error(error)
  }, [error])

  return (
    <Section className="min-h-[75vh] grow justify-center items-center text-center">
      <h1 className="text-xl">{t('title')}</h1>

      <p className="opacity-60">{t('description')}</p>

      <Button color="primary" onClick={reset}>
        {t('tryAgain')}
      </Button>
    </Section>
  )
}
