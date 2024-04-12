import { Product } from '@/features/Product/model'
import { MediaType } from '@/features/Media/model'
import img0 from './media/0.jpeg'

export default {
  id: 'onion',
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
