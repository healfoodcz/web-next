import { MediaType } from '@/features/Media/model'
import { Product } from '@/features/Product/model'
import img0 from './media/0.jpeg'

export default {
  id: 'cinnamon',
  title: {
    en: 'cinnamon',
    ru: 'корица',
    cs: 'skořice',
    de: 'Zimt',
  },
  media: [
    {
      type: MediaType.IMAGE,
      source: img0,
    },
  ],
} as Product
