import { PayloadAction } from '@reduxjs/toolkit'

export interface CartState {
  items: CartItem[]
  totalPrice: number
  totalCount: number
}

export interface CartItem {
  id: number
  name: string
  img: string
  actualPrice: number
  link: string
  quantity: number
  totalPrice: number
}

export type FindProductIndex = (state: CartState, action: PayloadAction<CartItem>) => number
