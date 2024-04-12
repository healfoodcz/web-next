import { Product } from '@/features/Product/model'
import { MediaType } from '@/features/Media/model'
import img0 from './media/0.jpeg'

export default {
  id: 'scallion',
  title: {
    en: 'scallion',
    ru: 'зеленый лук',
    cs: 'jarní cibulka',
    de: 'grüne Zwiebel',
  },
  media: [
    {
      type: MediaType.IMAGE,
      source: img0,
    },
  ],
} as Product
