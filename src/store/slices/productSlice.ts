import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductItem, ProductState } from '../../types/products'

const initialState: ProductState = {
  item: {
    name: '',
    description: '',
    id: 0,
    link: '',
    actualPrice: 0,
    oldPrice: 0,
    available: 0,
    rating: 0,
    img: '2329647605.jpg',
  },
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
