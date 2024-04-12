import { MediaType } from '@/features/Media/model'
import { Product } from '@/features/Product/model'
import img0 from './media/0.jpeg'

export default {
  id: 'turmeric',
  title: {
    en: 'turmeric',
    ru: 'куркума',
    de: 'Kurkuma',
    cs: 'kurkuma',
  },
  media: [
    {
      type: MediaType.IMAGE,
      source: img0,
    },
  ],
} as Product
