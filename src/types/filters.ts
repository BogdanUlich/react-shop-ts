export interface sortBy {
  type: string
  order: string
  name: string
}

export interface FiltersState {
  sortBy: sortBy
}
