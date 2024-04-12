import { Translated } from '@/features/Translations'
import { Products, Product } from '@/features/Product'
import { Params } from '../Common/lib'

export interface Category {
  id: string
  title: Translated<string>
  preview: Product
  products: Products
}

export type Categories = Array<Category>

export type CategoryParams = Params<{
  category: string
}>
