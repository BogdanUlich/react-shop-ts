import { CategoryActionsTypes } from "../constants";

export interface CategoriesState {
  items: Array<CategoryItem>;
  category: null | string;
  isLoaded: boolean;
}

export interface CategoryItem {
  name: string;
  description: string;
  shw: number;
  id: number;
  link: string;
  img: string;
}

export interface SetCategoryAction {
  type: typeof CategoryActionsTypes.SET_CATEGORY;
  payload: Array<CategoryItem>;
}

export interface SelectCategoryAction {
  type: typeof CategoryActionsTypes.SELECT_CATEGORY;
  payload: string;
}

export interface SetCategoryLoadedAction {
  type: typeof CategoryActionsTypes.SET_LOADED;
  payload: boolean;
}

export type CategoryAction =
  | SetCategoryAction
  | SelectCategoryAction
  | SetCategoryLoadedAction;
