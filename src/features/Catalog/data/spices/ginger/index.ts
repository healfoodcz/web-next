import { MediaType } from '@/features/Media/model'
import { Product } from '@/features/Product/model'
import img0 from './media/0.jpeg'

export default {
  id: 'ginger',
  title: {
    en: 'ginger',
    ru: 'имбирь',
    cs: 'zázvor',
    de: 'Ingwer',
  },
  media: [
    {
      type: MediaType.IMAGE,
      source: img0,
    },
  ],
} as Product
