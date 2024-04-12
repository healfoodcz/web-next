import { Product } from '@/features/Product/model'
import { MediaType } from '@/features/Media/model'
import img0 from './media/0.jpeg'

export default {
  id: 'melon',
  title: {
    en: 'melon',
    ru: 'дыня',
    cs: 'žlutý meloun',
    de: 'Melone',
  },
  media: [
    {
      type: MediaType.IMAGE,
      source: img0,
    },
  ],
} as Product
