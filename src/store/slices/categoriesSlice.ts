import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CategoriesState } from "../../types/category"

const initialState: CategoriesState = {
  items: [],
  category: null,
  isLoaded: false,
}

export const CategoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.items = action.payload
      state.isLoaded = true
    },
    selectCategory: (state, action) => {
      state.category = action.payload
    },
    setCategoryLoaded: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload
    },
  },
})

export const { setCategories, selectCategory, setCategoryLoaded } =
  CategoriesSlice.actions

export default CategoriesSlice.reducer
