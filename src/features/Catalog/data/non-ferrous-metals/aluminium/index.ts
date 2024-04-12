import { MediaType } from '@/features/Media/model'
import { Product } from '@/features/Product/model'
import img0 from './media/0.jpeg'
import vid1 from './media/1.mp4'
import vid2 from './media/2.mp4'
import vid3 from './media/3.mp4'
import img4 from './media/4.jpeg'

export default {
  id: 'aluminium',
  title: {
    en: 'aluminium',
    ru: 'алюминий',
    cs: 'hliník',
    de: 'Aluminium',
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
    {
      type: MediaType.VIDEO,
      source: vid2,
    },
    {
      type: MediaType.VIDEO,
      source: vid3,
    },
    {
      type: MediaType.IMAGE,
      source: img4,
    },
  ],
} as Product
