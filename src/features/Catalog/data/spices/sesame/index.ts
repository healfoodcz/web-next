import { MediaType } from '@/features/Media/model'
import { Product } from '@/features/Product/model'
import img0 from './media/0.jpeg'

export default {
  id: 'sesame',
  title: {
    en: 'sesame',
    ru: 'кунжут',
    cs: 'sezam',
    de: 'Sesam',
  },
  media: [
    {
      type: MediaType.IMAGE,
      source: img0,
    },
  ],
} as Product
