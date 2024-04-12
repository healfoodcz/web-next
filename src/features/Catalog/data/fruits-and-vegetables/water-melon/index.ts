import { Product } from '@/features/Product/model'
import { MediaType } from '@/features/Media/model'
import img0 from './media/0.jpeg'
import vid1 from './media/1.mp4'

export default {
  id: 'watermelon',
  title: {
    en: 'watermelon',
    ru: 'арбуз',
    cs: 'vodní meloun',
    de: 'Wassermelone',
  },
  media: [
    {
      type: MediaType.IMAGE,
      source: img0,
    },
    {
      type: MediaType.VIDEO,
      source: vid1,
    },
  ],
} as Product
