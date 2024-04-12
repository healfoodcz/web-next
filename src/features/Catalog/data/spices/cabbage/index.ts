import { MediaType } from '@/features/Media/model'
import { Product } from '@/features/Product/model'
import img0 from './media/0.jpeg'

export default {
  id: 'cabbage',
  title: {
    en: 'cabbage',
    ru: 'капуста',
    cs: 'zelí',
    de: 'Kohl',
  },
  media: [
    {
      type: MediaType.IMAGE,
      source: img0,
    },
  ],
} as Product
