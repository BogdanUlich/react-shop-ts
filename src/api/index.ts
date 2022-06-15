import axios from 'axios'

// CART
export const fetchCities = (cityName: string) => {
  return axios.get(`http://elfbar-shop/?action=getCity&name=${cityName}`).then((response) => response.data)
}

export const fetchWarehouses = (id: number, setWarehouses: Function) => {
  axios.get(`http://elfbar-shop/?action=getWarehouse&cityRef=${id}`).then((response) => setWarehouses(response.data))
}

export const createOrder = (data: object, showModal: Function, setOrderNumber: Function) => {
  axios
    .post('http://elfbar-shop/?action=createOrder', data)
    .then((response) => setOrderNumber(response.data))
    .then(showModal())
    .catch((response) => console.log(response))
}
// CART

// SEARCH
export const searchProduct = (productName: string, showProducts: Function) => {
  return axios
    .get(`http://elfbar-shop/?action=searchProduct&name=${productName}`)
    .then((response) => showProducts(response.data))
    .catch(() => showProducts(false))
}
// SEARCH
