import { Product } from '@/features/Product/model'
import { MediaType } from '@/features/Media/model'
import img0 from './media/0.jpeg'

export default {
  id: 'green-pepper',
  title: {
    en: 'green pepper',
    ru: 'зеленый перец',
    cs: 'zelená paprika',
    de: 'grünes Pfeffer',
  },
  media: [
    {
      type: MediaType.IMAGE,
      source: img0,
    },
  ],
} as Product
