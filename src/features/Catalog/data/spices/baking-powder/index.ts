import { MediaType } from '@/features/Media/model'
import { Product } from '@/features/Product/model'
import img0 from './media/0.jpeg'

export default {
  id: 'baking-powder',
  title: {
    en: 'baking powder',
    ru: 'разрыхлитель',
    cs: 'prášek na pečení',
    de: 'Backpulver',
  },
  media: [
    {
      type: MediaType.IMAGE,
      source: img0,
    },
  ],
} as Product
