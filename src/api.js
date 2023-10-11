
const PORT = 3000;
const URL = `http://localhost:${PORT}/`;
const BASE_ROUTE = 'api/product/'

const ROUTES = {
  GET_PRODUCTS: 'products/',
  POST_PRODUCT: '',
  DELETE_PRODUCT: '',
  PATCH_PRODUCT: '',
  SEARCH_PRODUCTS_BY_DEVELOPER: 'products/developer/',
  SEARCH_PRODUCTS_BY_SCRUMMASTER: 'products/scrum_master/',
}

async function fetchWrapper(url, options){
  return new Promise( (resolve, reject) => { 
    fetch(url, options)
      .then(((res) => res.json()))
        .then((data) => {resolve(data)})
        .catch((error) => {reject(error)});
});}

const getProducts = async () => fetchWrapper(`${URL}${BASE_ROUTE}${ROUTES.GET_PRODUCTS}`, null)

const postProduct = async (product) => 
  fetchWrapper(`${URL}${BASE_ROUTE}${ROUTES.POST_PRODUCT}`, {
    method: 'POST',
    body: JSON.stringify(product),
    headers: {
        "Content-Type": "application/json",
}})

const deleteProduct = async (product_id) => 
fetchWrapper(`${URL}${BASE_ROUTE}${ROUTES.DELETE_PRODUCT}${product_id}`, {
  method: 'DELETE',
  headers: {
      "Content-Type": "application/json",
  }})

const editProduct = async (product, product_id) => 
fetchWrapper(`${URL}${BASE_ROUTE}${ROUTES.PATCH_PRODUCT}${product_id}`, {
  method: 'PUT',
  body: JSON.stringify(product),
  headers: {
      "Content-Type": "application/json",
  }})

const findProductsByDeveloper = async (developer_name) => 
fetchWrapper(`${URL}${BASE_ROUTE}${ROUTES.SEARCH_PRODUCTS_BY_DEVELOPER}${developer_name}`, {
  method: 'GET',
  headers: {
      "Content-Type": "application/json",
  }     
})

const findProductsByScrumMaster = async (sm_name) => 
fetchWrapper(`${URL}${BASE_ROUTE}${ROUTES.SEARCH_PRODUCTS_BY_SCRUMMASTER}${sm_name}`, {
  method: 'GET',
  headers: {
      "Content-Type": "application/json",
  }     
})

export const API = { getProducts, postProduct, deleteProduct, editProduct, findProductsByDeveloper, findProductsByScrumMaster }

