import { Category } from '@/features/Category/model'
import aluminium from './aluminium'

export const nonFerrousMetals: Category = {
  id: 'non-ferrous-metals',
  title: {
    en: 'non-ferrous metals',
    ru: 'цветные металлы',
    cs: 'neželezné kovy',
    de: 'Nichteisenmetalle',
  },
  preview: aluminium,
  products: [aluminium],
}
