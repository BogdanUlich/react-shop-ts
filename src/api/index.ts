import axios from "axios";
import { Dispatch } from "redux";
import { setCategory, setCategoryLoaded } from "../store/actions/category";
import { setLoaded, setProduct, setProducts } from "../store/actions/products";
import { CategoryAction } from "../types/category";
import { sortBy } from "../types/filters";
import { ProductsAction } from "../types/products";

// CATEGORIES
export const fetchCategory = () => (dispatch: Dispatch<CategoryAction>) => {
  dispatch(setCategoryLoaded(false));
  axios
    .get("http://elfbar-shop/?action=getIndexCategories")
    .then(function (response) {
      dispatch(setCategory(response.data));
    });
};
// CATEGORIES

// PRODUCTS
export const fetchProduct =
  (link: string) => (dispatch: Dispatch<ProductsAction>) => {
    dispatch(setLoaded(false));
    axios
      .get("http://elfbar-shop/?action=getProduct&link=" + link)
      .then(function (response) {
        dispatch(setProduct([response.data]));
      });
  };

export const fetchProducts =
  (category: string, sortBy: sortBy) =>
  (dispatch: Dispatch<ProductsAction>) => {
    dispatch(setLoaded(false));
    axios
      .get(
        "http://elfbar-shop/?action=getCategoryProducts&category=" +
          category +
          "&sort=" +
          sortBy.type +
          "&order=" +
          sortBy.order
      )
      .then(function (response) {
        dispatch(setProducts(response.data));
      });
  };

export const fetchPopularProducts =
  () => (dispatch: Dispatch<ProductsAction>) => {
    dispatch(setLoaded(false));
    axios
      .get("http://elfbar-shop/?action=getPopularProducts")
      .then(function (response) {
        dispatch(setProducts(response.data));
      });
  };
// PRODUCTS

// CART
export const fetchCities = (cityName: string) => {
  return axios
    .get(`http://elfbar-shop/?action=getCity&name=${cityName}`)
    .then((response) => response.data);
};

export const fetchWarehouses = (id: number, setWarehouses: Function) => {
  axios
    .get(`http://elfbar-shop/?action=getWarehouse&cityRef=${id}`)
    .then((response) => setWarehouses(response.data));
};

export const createOrder = (
  data: object,
  showModal: Function,
  setOrderNumber: Function
) => {
  axios
    .post("http://elfbar-shop/?action=createOrder", data)
    .then((response) => setOrderNumber(response.data))
    .then(showModal())
    .catch((response) => console.log(response));
};
// CART

// SEARCH
export const searchProduct = (
  productName: string,
  showProducts: Function,
  toggleVisibleSearchList: Function
) => {
  if (productName) {
    return axios
      .get(`http://elfbar-shop/?action=searchProduct&name=${productName}`)
      .then((response) => showProducts(response.data))
      .then(toggleVisibleSearchList(true))
      .catch(() => showProducts(false));
  } else {
    toggleVisibleSearchList(false);
  }
};
// SEARCH
