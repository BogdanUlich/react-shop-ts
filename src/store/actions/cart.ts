import { CartActionsTypes } from "../../constants";
import {
  AddItemToCartAction,
  ClearCartAction,
  MinusCartItemAction,
  PlusCartItemAction,
  RemoveCartItemAction,
} from "../../types/cart";

export const addItemToCart = (obj: object): AddItemToCartAction => ({
  type: CartActionsTypes.ADD_ITEM_TO_CART,
  payload: obj,
});

export const removeCartItem = (id: number): RemoveCartItemAction => ({
  type: CartActionsTypes.REMOVE_CART_ITEM,
  payload: id,
});

export const plusCartItem = (id: number): PlusCartItemAction => ({
  type: CartActionsTypes.PLUS_CART_ITEM,
  payload: id,
});

export const minusCartItem = (id: number): MinusCartItemAction => ({
  type: CartActionsTypes.MINUS_CART_ITEM,
  payload: id,
});

export const clearCart = (): ClearCartAction => ({
  type: CartActionsTypes.CLEAR_CART,
});
