import { CartActionsTypes } from "../../constants";
import { CartAction, CartItem, CartState } from "../../types/cart";

const initialState: CartState = {
  items: {} as CartItem,
  totalPrice: 0,
  totalCount: 0,
};

const getTotalPrice = (arr) =>
  arr.reduce((sum, obj) => obj.actualPrice + sum, 0);

const cart = (state = initialState, action: CartAction): CartState => {
  switch (action.type) {
    case CartActionsTypes.ADD_ITEM_TO_CART: {
      const currentItems = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload];

      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentItems,
          totalPrice: getTotalPrice(currentItems),
        },
      };

      const items = Object.values(newItems).map((obj) => obj.items);
      const allItems = [].concat(...items);
      const totalPrice = getTotalPrice(allItems);

      return {
        ...state,
        items: newItems,
        totalCount: allItems.length,
        totalPrice,
      };
    }

    case CartActionsTypes.CLEAR_CART: {
      return {
        ...state,
        items: {},
        totalPrice: 0,
        totalCount: 0,
      };
    }

    case CartActionsTypes.PLUS_CART_ITEM: {
      const newItems = [
        ...state.items[action.payload].items,
        state.items[action.payload].items[0],
      ];
      const plusTotalCount = state.totalCount + 1;
      const plusTotalPrice =
        state.totalPrice + state.items[action.payload].items[0].actualPrice;

      return {
        ...state,
        items: {
          ...state.items,
          [action.payload]: {
            items: newItems,
            totalPrice: getTotalPrice(newItems),
          },
        },
        totalPrice: plusTotalPrice,
        totalCount: plusTotalCount,
      };
    }

    case CartActionsTypes.MINUS_CART_ITEM: {
      const oldItems = state.items[action.payload].items;
      const newItems =
        oldItems.length > 1
          ? state.items[action.payload].items.slice(1)
          : oldItems;
      const minusTotalCount =
        state.totalCount > 1 && state.items[action.payload].items.length > 1
          ? state.totalCount - 1
          : state.totalCount;
      const minusTotalPrice =
        state.items[action.payload].items.length > 1
          ? state.totalPrice - state.items[action.payload].items[0].actualPrice
          : state.totalPrice;

      return {
        ...state,
        items: {
          ...state.items,
          [action.payload]: {
            items: newItems,
            totalPrice: getTotalPrice(newItems),
          },
        },
        totalPrice: minusTotalPrice,
        totalCount: minusTotalCount,
      };
    }

    case CartActionsTypes.REMOVE_CART_ITEM: {
      const withoutRemovedItems = {
        ...state.items,
      };
      const currentTotalPrice = withoutRemovedItems[action.payload].totalPrice;
      const currentTotalCount =
        withoutRemovedItems[action.payload].items.length;
      delete withoutRemovedItems[action.payload];

      return {
        ...state,
        items: withoutRemovedItems,
        totalPrice: state.totalPrice - currentTotalPrice,
        totalCount: state.totalCount - currentTotalCount,
      };
    }

    default:
      return state;
  }
};

export default cart;
