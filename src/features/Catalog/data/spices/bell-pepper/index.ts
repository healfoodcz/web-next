import { MediaType } from '@/features/Media/model'
import { Product } from '@/features/Product/model'
import img0 from './media/0.jpeg'

export default {
  id: 'bell-pepper',
  title: {
    en: 'bell pepper',
    ru: 'болгарский перец',
    cs: 'paprika',
    de: 'bulgarische Paprika',
  },
  media: [
    {
      type: MediaType.IMAGE,
      source: img0,
    },
  ],
} as Product
