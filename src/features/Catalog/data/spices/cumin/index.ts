import { MediaType } from '@/features/Media/model'
import { Product } from '@/features/Product/model'
import img0 from './media/0.jpeg'

export default {
  id: 'cumin',
  title: {
    en: 'cumin',
    ru: 'зира',
    cs: 'římský kmín',
    de: 'Kreuzkümmel',
  },
  media: [
    {
      type: MediaType.IMAGE,
      source: img0,
    },
  ],
} as Product
