import { Product } from '@/features/Product/model'
import { MediaType } from '@/features/Media/model'
import img0 from './media/0.jpeg'

export default {
  id: 'parsley',
  title: {
    en: 'parsley',
    ru: 'петрушка',
    cs: 'petržel',
    de: 'Petersilie',
  },
  media: [
    {
      type: MediaType.IMAGE,
      source: img0,
    },
  ],
} as Product