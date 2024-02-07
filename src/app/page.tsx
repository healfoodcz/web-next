import { createTitle } from '@/lib'
import type { Metadata } from 'next'
import Logotype from '@/components/Logotype'
import ThemeSelector from '@/components/ThemeSelector'



export const metadata: Metadata = {
  title: createTitle('Homepage'),
  description: ''
}



export default function Home() {
  return (
    <>
      <Logotype/>
      <ThemeSelector/>
    </>
  )
}
