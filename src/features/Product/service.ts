import { getAllCategories } from '@/features/Category'

export function getAllProducts() {
  return getAllCategories().flatMap((category) => category.products)
}

export function getProductById(productId: string) {
  return getAllProducts().find((product) => product.id === productId)
}
