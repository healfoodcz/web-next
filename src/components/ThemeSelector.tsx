'use client'



import { Button } from '@nextui-org/react'
import { MoonStars, Sun } from '@phosphor-icons/react/dist/ssr'
import { useTheme } from 'next-themes'
import { useTranslations } from 'next-intl'



export default function ThemeSelector() {
  const { setTheme } = useTheme()
  const t = useTranslations('features.theme')

  return (
    <>
      <Button className='capitalize' startContent={ <MoonStars/> } onClick={ () => setTheme('dark') }>{ t('darkTheme') }</Button>
      <Button className='capitalize' startContent={ <Sun/> } onClick={ () => setTheme('light') }>{ t('lightTheme') }</Button>
      <Button className='capitalize' startContent={ <Sun/> } onClick={ () => setTheme('system') }>{ t('systemTheme') }</Button>
    </>
  )
}
