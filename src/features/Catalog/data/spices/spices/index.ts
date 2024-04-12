import { MediaType } from '@/features/Media/model'
import { Product } from '@/features/Product/model'
import img0 from './media/0.jpeg'
import img1 from './media/1.jpeg'
import img2 from './media/2.jpeg'
import img3 from './media/3.jpeg'
import img4 from './media/4.jpeg'
import img5 from './media/5.jpeg'

export default {
  id: 'spices',
  title: {
    en: 'spices',
    ru: 'специи',
    cs: 'koření',
    de: 'Gewürze',
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
    {
      type: MediaType.IMAGE,
      source: img4,
    },
    {
      type: MediaType.IMAGE,
      source: img5,
    },
  ],
} as Product
