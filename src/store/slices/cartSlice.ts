import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItem, CartState, FindProduct, FindProductIndex } from '../../types/cart'

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
}

const findProduct: FindProduct = (state, action) => {
  return state.items.find((obj) => obj.id === action.payload.id)
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const product = findProduct(state, action)

      if (product) {
        product.quantity += action.payload.quantity
        product.totalPrice += action.payload.totalPrice * action.payload.quantity
      } else {
        state.items.push(action.payload)
      }

      state.totalCount += action.payload.quantity
      state.totalPrice += action.payload.actualPrice * action.payload.quantity
    },
    plusCartItem: (state, action: PayloadAction<CartItem>) => {
      const product = findProduct(state, action)

      if (product) {
        product.quantity += 1
        product.totalPrice += action.payload.actualPrice
      }

      state.totalCount += 1
      state.totalPrice += action.payload.actualPrice
    },
    minusCartItem: (state, action: PayloadAction<CartItem>) => {
      const product = findProduct(state, action)

      if (product && product.quantity > 1) {
        product.quantity -= 1
        product.totalPrice -= action.payload.actualPrice
        state.totalCount -= 1
        state.totalPrice -= action.payload.actualPrice
      }
    },
    removeCartItem: (state, action: PayloadAction<CartItem>) => {
      const productIndex = state.items.findIndex((obj) => obj.id === action.payload.id)

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
