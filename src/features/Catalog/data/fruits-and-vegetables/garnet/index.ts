import { Product } from '@/features/Product/model'
import { MediaType } from '@/features/Media/model'
import img0 from './media/0.jpeg'
import img1 from './media/1.jpeg'

export default {
  id: 'pomegranate',
  title: {
    en: 'pomegranate',
    ru: 'гранат',
    cs: 'granátové jablko',
    de: 'Granatapfel',
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
