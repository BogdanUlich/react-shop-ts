export interface ProductState {
  item: ProductItem
  items: ProductItem[]
  loading: 'pending' | 'success' | 'error'
}

export interface fetchProductsParams {
  category: string | undefined
  type: string
  order: string
}

export interface ProductItem {
  name: string
  description: string
  id: number
  link: string
  actualPrice: number
  oldPrice: number
  available: number
  rating: number
  img: string
}
