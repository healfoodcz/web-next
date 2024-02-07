'use client'



import { Button } from '@nextui-org/react'
import { useTransition } from 'react'
import { useRouter, usePathname, locale } from '@/lib'
import { Translate } from '@phosphor-icons/react'



export default function LanguageSelector() {
  const pathname = usePathname()
  const router = useRouter()
  const [ , startTransition ] = useTransition()

  function setLocale(locale: locale) {
    startTransition(() => {
      router.replace(pathname, { locale })
    })
  }

  return (
    <>
      <Button className='capitalize' startContent={ <Translate/> } onClick={ () => setLocale('en') }>English</Button>
      <Button className='capitalize' startContent={ <Translate/> } onClick={ () => setLocale('ru') }>Русский</Button>
      <Button className='capitalize' startContent={ <Translate/> } onClick={ () => setLocale('de') }>Deutsch</Button>
      <Button className='capitalize' startContent={ <Translate/> } onClick={ () => setLocale('cs') }>Česky</Button>
    </>
  )
}
