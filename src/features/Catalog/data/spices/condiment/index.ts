import { MediaType } from '@/features/Media/model'
import { Product } from '@/features/Product/model'
import img0 from './media/0.jpeg'
import img1 from './media/1.jpeg'
import img2 from './media/2.jpeg'
import img3 from './media/3.jpeg'

export default {
  id: 'condiment',
  title: {
    en: 'condiment',
    ru: 'приправа',
    cs: 'koření',
    de: 'Würze',
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
    {
      type: MediaType.IMAGE,
      source: img2,
    },
    {
      type: MediaType.IMAGE,
      source: img3,
    },
  ],
} as Product
