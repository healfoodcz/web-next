import { MediaType } from '@/features/Media/model'
import { Product } from '@/features/Product/model'
import img0 from './media/0.jpeg'

export default {
  id: 'shredded-coconut',
  title: {
    en: 'shredded coconut',
    ru: 'кокосовая стружка',
    cs: 'strouhaný kokos',
    de: 'Kokosraspeln',
  },
  media: [
    {
      type: MediaType.IMAGE,
      source: img0,
    },
  ],
} as Product
