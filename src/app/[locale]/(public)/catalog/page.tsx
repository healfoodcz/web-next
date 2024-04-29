import { redirect, LocaleParams } from '@/features/Translations'
import { getAllCategories } from '@/features/Category'
import { unstable_setRequestLocale as setRequestLocale } from 'next-intl/server'

export default function Page({ params }: LocaleParams) {
  setRequestLocale(params.locale)
  return redirect(`/catalog/${getAllCategories()[0].id}`)
}
