import { catalog } from '@/features/Catalog'
import { Category } from './model'

export function getAllCategories() {
  return catalog.categories
}

export function getCategoryById(categoryId: string): Category | undefined {
  return getAllCategories().find((category) => category.id === categoryId)
}

export function getCategoryByProductId(productId: string): Category | undefined {
  return getAllCategories().find((category) => category.products.find((product) => product.id === productId))
}
