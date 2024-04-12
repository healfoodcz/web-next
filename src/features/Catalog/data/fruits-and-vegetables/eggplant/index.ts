import { Product } from '@/features/Product/model'
import { MediaType } from '@/features/Media/model'
import img0 from './media/0.jpeg'

export default {
  id: 'eggplant',
  title: {
    en: 'eggplant',
    ru: 'баклажан',
    cs: 'lilek',
    de: 'Aubergine',
  },
  media: [
    {
      type: MediaType.IMAGE,
      source: img0,
    },
  ],
} as Product
