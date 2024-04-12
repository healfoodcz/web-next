import { MediaType } from '@/features/Media/model'
import { Product } from '@/features/Product/model'
import img0 from './media/0.jpeg'

export default {
  id: 'yellow-pepper',
  title: {
    en: 'yellow pepper',
    ru: 'желтый перец',
    cs: 'žlutá paprika',
    de: 'gelbe Paprika',
  },
  media: [
    {
      type: MediaType.IMAGE,
      source: img0,
    },
  ],
} as Product
