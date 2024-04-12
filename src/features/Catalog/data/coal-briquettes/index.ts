import { Category } from '@/features/Category/model'
import coalBriquettesForHeating from './coal-briquettes-for-heating'

export const coalBriquettes: Category = {
  id: 'coal-briquettes',
  title: {
    en: 'coal briquettes',
    ru: 'угольные брикеты',
    cs: 'uhelné brikety',
    de: 'Kohlebriketts',
  },
  preview: coalBriquettesForHeating,
  products: [coalBriquettesForHeating],
}
