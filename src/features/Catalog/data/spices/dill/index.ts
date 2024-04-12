import { MediaType } from '@/features/Media/model'
import { Product } from '@/features/Product/model'
import img0 from './media/0.jpeg'

export default {
  id: 'dill',
  title: {
    en: 'dill',
    ru: 'укроп',
    cs: 'kopr',
    de: 'Dill',
  },
  media: [
    {
      type: MediaType.IMAGE,
      source: img0,
    },
  ],
} as Product
