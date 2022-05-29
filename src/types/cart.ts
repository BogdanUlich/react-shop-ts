import { CartActionsTypes } from "../constants";

export interface CartState {
  items: CartItem;
  totalPrice: number;
  totalCount: number;
}

export interface CartItem {
  id: number;
  name: string;
  img: string;
  actualPrice: number;
}

export interface AddItemToCartAction {
  type: typeof CartActionsTypes.ADD_ITEM_TO_CART;
  payload: object;
}

export interface RemoveCartItemAction {
  type: typeof CartActionsTypes.REMOVE_CART_ITEM;
  payload: number;
}

export interface PlusCartItemAction {
  type: typeof CartActionsTypes.PLUS_CART_ITEM;
  payload: number;
}

export interface MinusCartItemAction {
  type: typeof CartActionsTypes.MINUS_CART_ITEM;
  payload: number;
}

export interface ClearCartAction {
  type: typeof CartActionsTypes.CLEAR_CART;
}

export type CartAction =
  | AddItemToCartAction
  | RemoveCartItemAction
  | PlusCartItemAction
  | MinusCartItemAction
  | ClearCartAction;
