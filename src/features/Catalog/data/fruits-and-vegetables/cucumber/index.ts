import { Product } from '@/features/Product/model'
import { MediaType } from '@/features/Media/model'
import img0 from './media/0.jpeg'
import img1 from './media/1.jpeg'
// ISSUE: not presentable (tomatoes are yellow, photos are sufficient, audio)
// import vid2 from './media/2.mp4'

export default {
  id: 'cucumber',
  title: {
    en: 'cucumber',
    ru: 'огурец',
    cs: 'okurka',
    de: 'Gurke',
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
    // {
    //   type: MediaType.VIDEO,
    //   source: vid2,
    // },
  ],
} as Product
