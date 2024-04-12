import { Product } from '@/features/Product/model'
import { MediaType } from '@/features/Media/model'
import img0 from './media/0.jpeg'

export default {
  id: 'radish',
  title: {
    en: 'radish',
    ru: 'редька',
    cs: 'ředkev',
    de: 'Rettich',
  },
  media: [
    {
      type: MediaType.IMAGE,
      source: img0,
    },
  ],
} as Product
