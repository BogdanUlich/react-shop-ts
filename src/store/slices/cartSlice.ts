import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItem, CartState, FindProductIndex } from '../../types/cart'

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
}

const findProductIndex: FindProductIndex = (state, action) => {
  return state.items.findIndex((obj) => obj.id === action.payload.id)
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const productIndex = findProductIndex(state, action)
      if (productIndex !== -1) {
        state.items[productIndex].quantity += action.payload.quantity
        state.items[productIndex].totalPrice = action.payload.totalPrice * action.payload.quantity
      } else {
        state.items.push(action.payload)
      }
      state.totalCount += action.payload.quantity
      state.totalPrice += action.payload.actualPrice * action.payload.quantity
    },
    plusCartItem: (state, action: PayloadAction<CartItem>) => {
      const productIndex = findProductIndex(state, action)
      state.items[productIndex].quantity += 1
      state.items[productIndex].totalPrice += action.payload.actualPrice
      state.totalCount += 1
      state.totalPrice += action.payload.actualPrice
    },
    minusCartItem: (state, action: PayloadAction<CartItem>) => {
      const productIndex = findProductIndex(state, action)
      if (state.items[productIndex].quantity > 1) {
        state.items[productIndex].quantity -= 1
        state.items[productIndex].totalPrice -= action.payload.actualPrice
        state.totalCount -= 1
        state.totalPrice -= action.payload.actualPrice
      }
    },
    removeCartItem: (state, action: PayloadAction<CartItem>) => {
      const productIndex = findProductIndex(state, action)
      state.items.splice(productIndex, 1)
      state.totalCount -= action.payload.quantity
      state.totalPrice -= action.payload.totalPrice
    },
    clearCart: (state) => {
      state.items = initialState.items
      state.totalCount = 0
      state.totalPrice = 0
    },
  },
})

export const { addItemToCart, plusCartItem, minusCartItem, removeCartItem, clearCart } = cartSlice.actions

export default cartSlice.reducer
