import { redirect } from '@/features/Translations'
import { getAllCategories } from '@/features/Category'

export default function Page() {
  return redirect(`/catalog/${getAllCategories()[0].id}`)
}
