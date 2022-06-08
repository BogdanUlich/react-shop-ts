import { createSlice } from '@reduxjs/toolkit'
import { FiltersState, sortBy } from '../../types/filters'

const initialState: FiltersState = {
  sortBy: {
    type: 'rating',
    order: 'desc',
    name: 'популярности',
  },
}

export const counterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
  },
})

export const { setSortBy } = counterSlice.actions

export default counterSlice.reducer
