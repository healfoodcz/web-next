import { MediaType } from '@/features/Media/model'
import { Product } from '@/features/Product/model'
import img0 from './media/0.jpeg'

export default {
  id: 'beet',
  title: {
    en: 'beet',
    ru: 'свекла',
    cs: 'řepa',
    de: 'Rübe',
  },
  media: [
    {
      type: MediaType.IMAGE,
      source: img0,
    },
  ],
} as Product
