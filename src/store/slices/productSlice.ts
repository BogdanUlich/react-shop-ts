import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { fetchProductsParams, ProductItem, ProductState } from '../../types/products'

export const fetchProduct = createAsyncThunk('products/fetchProduct', async (link: string | undefined) => {
  const { data } = await axios.get('http://elfbar-shop/?action=getProduct&link=' + link)

  return data
})

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (params: fetchProductsParams) => {
  const { data } = await axios.get(
    'http://elfbar-shop/?action=getCategoryProducts&category=' +
      params.category +
      '&sort=' +
      params.type +
      '&order=' +
      params.order
  )

  return data
})

export const fetchPopularProducts = createAsyncThunk('products/fetchPopularProducts', async () => {
  const { data } = await axios.get('http://elfbar-shop/?action=getPopularProducts')

  return data
})

const initialState: ProductState = {
  item: {} as ProductItem,
  items: [],
  loading: 'pending',
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.item = {} as ProductItem
        state.loading = 'pending'
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.item = action.payload
        state.loading = 'success'
      })
      .addCase(fetchProduct.rejected, (state) => {
        state.item = {} as ProductItem
        state.loading = 'error'
      })
      .addCase(fetchProducts.pending, (state) => {
        state.items = []
        state.loading = 'pending'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = 'success'
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.items = []
        state.loading = 'error'
      })
      .addCase(fetchPopularProducts.pending, (state) => {
        state.items = []
        state.loading = 'pending'
      })
      .addCase(fetchPopularProducts.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = 'success'
      })
      .addCase(fetchPopularProducts.rejected, (state) => {
        state.items = []
        state.loading = 'error'
      })
  },
})

export const productSelector = (state: any) => state.products

export default productSlice.reducer
