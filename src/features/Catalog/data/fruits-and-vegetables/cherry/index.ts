import { Product } from '@/features/Product/model'
import { MediaType } from '@/features/Media/model'
import img0 from './media/0.jpeg'

export default {
  id: 'cherry',
  title: {
    en: 'cherry',
    ru: 'вишня',
    cs: 'třešeň',
    de: 'Kirsche',
  },
  media: [
    {
      type: MediaType.IMAGE,
      source: img0,
    },
  ],
} as Product
