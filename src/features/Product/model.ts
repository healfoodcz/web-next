import { Translated } from '@/features/Translations'
import { ImageMedia, SingleMedia } from '@/features/Media'

export interface Product {
  id: string
  title: Translated<string>
  description?: Translated<string>
  media: [ImageMedia] | [ImageMedia, ...SingleMedia[]]
}

export type Products = Array<Product>
