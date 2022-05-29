import { ProductsActionsTypes } from "../constants";

export interface productItem {
  name: string;
  description: string;
  id: number;
  link: string;
  actualPrice: number;
  oldPrice: number;
  available: number;
  rating: number;
  img: string;
}

export interface productsState {
  items: Array<productItem>;
  item: Array<productItem>;
  isLoaded: boolean;
}

export interface setProductsAction {
  type: typeof ProductsActionsTypes.SET_PRODUCTS;
  payload: Array<productItem>;
}

export interface setProductAction {
  type: typeof ProductsActionsTypes.SET_PRODUCT;
  payload: Array<productItem>;
}

export interface setLoadedAction {
  type: typeof ProductsActionsTypes.SET_LOADED;
  payload: boolean;
}

export type ProductsAction =
  | setProductsAction
  | setProductAction
  | setLoadedAction;
