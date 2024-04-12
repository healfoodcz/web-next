import { Product } from '@/features/Product/model'
import { MediaType } from '@/features/Media/model'
import img0 from './media/0.jpeg'

export default {
  id: 'garlic',
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
  ],
} as Product
