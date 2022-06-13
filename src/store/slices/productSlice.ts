import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductItem, ProductState } from '../../types/products'

const initialState: ProductState = {
  item: {} as ProductItem,
  items: [],
  isLoaded: false,
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductItem[]>) => {
      state.items = action.payload
      state.isLoaded = true
    },
    setProduct: (state, action: PayloadAction<ProductItem>) => {
      state.item = action.payload
      state.isLoaded = true
    },
    setProductsLoaded: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload
    },
  },
})

export const { setProducts, setProduct, setProductsLoaded } = productSlice.actions

export default productSlice.reducer
