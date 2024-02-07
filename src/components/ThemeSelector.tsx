'use client'



import { Button } from '@nextui-org/react'
import { MoonStars, Sun } from '@phosphor-icons/react/dist/ssr'
import { useTheme } from 'next-themes'



export default function ThemeSelector() {
  const { setTheme } = useTheme()

  return (
    <>
      <Button startContent={ <MoonStars/> } onClick={ () => setTheme('dark') }>Dark mode</Button>
      <Button startContent={ <Sun/> } onClick={ () => setTheme('light') }>Light mode</Button>
    </>
  )
}
