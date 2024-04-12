import { MediaType } from '@/features/Media/model'
import { Product } from '@/features/Product/model'
import img0 from './media/0.jpeg'

export default {
  id: 'chilli',
  title: {
    en: 'chilli',
    ru: 'чилли',
    cs: 'chilli',
    de: 'Chili',
  },
  media: [
    {
      type: MediaType.IMAGE,
      source: img0,
    },
  ],
} as Product
