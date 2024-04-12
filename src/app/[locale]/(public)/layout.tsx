import { PropsWithChildren } from 'react'
import { LocaleParams } from '@/features/Translations'
import { unstable_setRequestLocale as setRequestLocale } from 'next-intl/server'
import { Footer } from '@/features/Footer'
import { Navbar } from '@/features/Navbar'

export default function Layout({ children, params }: PropsWithChildren<LocaleParams>) {
  setRequestLocale(params.locale)

  return (
    <div className="flex flex-col">
      <div className="gap-4 min-h-screen">
        <Navbar />
        <main className="flex flex-col grow">{children}</main>
      </div>
      <Footer />
    </div>
  )
}
