import { Product } from '@/features/Product/model'
import { MediaType } from '@/features/Media/model'
import img0 from './media/0.jpeg'
import img1 from './media/1.jpeg'

export default {
  id: 'apple',
  title: {
    en: 'apple',
    ru: 'яблоко',
    cs: 'jablko',
    de: 'Apfel',
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
