import { MediaType } from '@/features/Media/model'
import { Product } from '@/features/Product/model'
import img0 from './media/0.jpeg'

export default {
  id: 'carrot',
  title: {
    en: 'carrot',
    ru: 'морковь',
    cs: 'mrkev',
    de: 'Karotte',
  },
  media: [
    {
      type: MediaType.IMAGE,
      source: img0,
    },
  ],
} as Product
