import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { CategoriesState } from '../../types/category'

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const { data } = await axios.get('http://elfbar-shop/?action=getIndexCategories')

  return data
})

const initialState: CategoriesState = {
  items: [],
  category: null,
  loading: 'pending',
}

export const CategoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    selectCategory: (state, action) => {
      state.category = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = 'pending'
        state.items = []
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = 'success'
        state.items = action.payload
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.loading = 'error'
      })
  },
})

export const categorySelector = (state: any) => state.categories

export const { selectCategory } = CategoriesSlice.actions

export default CategoriesSlice.reducer
