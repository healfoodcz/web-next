import { MediaType } from '@/features/Media/model'
import { Product } from '@/features/Product/model'
import img0 from './media/0.jpeg'

export default {
  id: 'spices-onion',
  title: {
    en: 'onion',
    ru: 'лук',
    cs: 'cibule',
    de: 'Zwiebel',
  },
  media: [
    {
      type: MediaType.IMAGE,
      source: img0,
    },
  ],
} as Product
