import { ProductsActionsTypes } from "../../constants";
import {
  productItem,
  setLoadedAction,
  setProductAction,
  setProductsAction,
} from "../../types/products";

export const setProducts = (
  payload: Array<productItem>
): setProductsAction => ({
  type: ProductsActionsTypes.SET_PRODUCTS,
  payload,
});

export const setProduct = (payload: Array<productItem>): setProductAction => ({
  type: ProductsActionsTypes.SET_PRODUCT,
  payload,
});

export const setLoaded = (payload: boolean): setLoadedAction => ({
  type: ProductsActionsTypes.SET_LOADED,
  payload,
});
