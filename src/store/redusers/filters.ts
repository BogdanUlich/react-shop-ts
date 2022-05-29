import { AnyAction } from "redux";
import { FiltersActionsTypes } from "../../constants";
import { FiltersAction, FiltersState } from "../../types/filters";

const initialState: FiltersState = {
  sortBy: {
    type: "rating",
    order: "desc",
  },
};

const filters = (state = initialState, action: AnyAction): FiltersState => {
  switch (action.type) {
    case FiltersActionsTypes.SET_SORT_BY:
      return {
        ...state,
        sortBy: action.payload,
      };
    default:
      return state;
  }
};

export default filters;
