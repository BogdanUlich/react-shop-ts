import { FiltersActionTypes } from "../../constants";
import { SetSortByAction, sortBy } from "../../types/filters";

export const setSortBy = (type: sortBy): SetSortByAction => ({
  type: FiltersActionTypes.SET_SORT_BY,
  payload: type,
});
