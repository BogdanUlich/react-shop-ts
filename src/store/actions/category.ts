import { CategoryActionsTypes } from "../../constants";
import {
  CategoryItem,
  SelectCategoryAction,
  SetCategoryAction,
  SetCategoryLoadedAction,
} from "../../types/category";

export const setCategory = (items: Array<CategoryItem>): SetCategoryAction => ({
  type: CategoryActionsTypes.SET_CATEGORY,
  payload: items,
});

export const selectCategory = (category: string): SelectCategoryAction => ({
  type: CategoryActionsTypes.SELECT_CATEGORY,
  payload: category,
});

export const setCategoryLoaded = (
  payload: boolean
): SetCategoryLoadedAction => ({
  type: CategoryActionsTypes.SET_LOADED,
  payload,
});
