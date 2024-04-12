import { MediaType } from '@/features/Media/model'
import { Product } from '@/features/Product/model'
import img0 from './media/0.jpeg'
import img1 from './media/1.jpeg'

export default {
  id: 'spices-garlic',
  title: {
    en: 'garlic',
    ru: 'чеснок',
    cs: 'česnek',
    de: 'Knoblauch',
  },
  media: [
    {
      type: MediaType.IMAGE,
      source: img0,
    },
    {
      type: MediaType.IMAGE,
      source: img1,
    },
  ],
} as Product
