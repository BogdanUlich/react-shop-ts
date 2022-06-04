import { configureStore } from '@reduxjs/toolkit'
import cart from './slices/cartSlice'
import filters from './slices/filtersSlice'
import leftMenu from './slices/leftMenuSlice'
import products from './slices/productSlice'
import categories from './slices/categoriesSlice'

export const store = configureStore({
  reducer: {
    cart,
    filters,
    leftMenu,
    products,
    categories,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
