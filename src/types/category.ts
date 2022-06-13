export interface CategoriesState {
  items: Array<CategoryItem>
  category: null | string
  loading: 'pending' | 'success' | 'error'
}

export interface CategoryItem {
  name: string
  description: string
  shw: number
  id: number
  link: string
  img: string
}
