export interface ProductState {
  item: ProductItem
  items: ProductItem[]
  isLoaded: boolean
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
