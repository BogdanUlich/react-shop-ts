import { FiltersActionsTypes } from "../constants";

export interface sortBy {
  type: string;
  order: string;
}

export interface FiltersState {
  sortBy: sortBy;
}

export interface SetSortByAction {
  type: FiltersActionsTypes.SET_SORT_BY;
  payload: sortBy;
}

export type FiltersAction = SetSortByAction;
