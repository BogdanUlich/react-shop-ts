import { AnyAction } from "redux";
import { CategoryActionsTypes } from "../../constants";
import { CategoriesState, CategoryAction } from "../../types/category";

const initialState: CategoriesState = {
  items: [],
  category: null,
  isLoaded: false,
};

const categories = (
  state = initialState,
  action: AnyAction
): CategoriesState => {
  switch (action.type) {
    case CategoryActionsTypes.SET_CATEGORY:
      return {
        ...state,
        items: action.payload,
        isLoaded: true,
      };
    case CategoryActionsTypes.SELECT_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case CategoryActionsTypes.SET_LOADED:
      return {
        ...state,
        isLoaded: action.payload,
      };
    default:
      return state;
  }
};

export default categories;
