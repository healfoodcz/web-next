import { MediaType } from '@/features/Media/model'
import { Product } from '@/features/Product/model'
import img0 from './media/0.jpeg'
import img1 from './media/1.jpeg'

export default {
  id: 'coal-briquettes-for-heating',
  title: {
    en: 'coal briquettes for heating',
    ru: 'Угольные брикеты для отопления',
    de: 'Kohlebriketts zum Heizen',
    cs: 'Uhelné brikety na topení',
  },
  description: {
    en: 'Packing: 10 kg, 50 kg, 1000 kg',
    ru: 'Фасовка: 10 кг, 50 кг, 1000 кг',
    de: 'Verpackung: 10 kg, 50 kg, 1000 kg',
    cs: 'Balení: 10 kg, 50 kg, 1000 kg',
  },
  media: [
    {
      type: MediaType.IMAGE,
      source: img0,
    },
    {
      type: MediaType.IMAGE,
      source: img1,
    },
  ],
} as Product
