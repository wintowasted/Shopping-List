import axios from 'axios'

const BASE_URL = 'http://localhost:5269/api'

const API  = axios.create({
    baseURL:  BASE_URL,
    withCredentials: true
})

export const privateAPI = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

export const login = (formData) =>  API.post("/auth/login", formData);
export const register = (formData) =>  API.post("/auth/register", formData);
export const refreshToken = () => privateAPI.get("/auth/refresh");

export const getLists = (id) =>  privateAPI.get(`/lists/${id}`);
export const addList = (listData) =>  privateAPI.post("/lists", {listName: listData});
export const deleteList = (id) =>  privateAPI.delete(`/lists/${id}`);
export const lockList = (id) => privateAPI.patch(`lists/${id}/lock`);
export const unlockList = (id) => privateAPI.patch(`lists/${id}/unlock`);

export const getProductsOfList = (id) => privateAPI.get(`/lists/${id}/products`)
export const addProductToList = (listId, productId) => privateAPI.post(`/lists/${listId}/products/${productId}`, void 0 )
export const deleteProductFromList = (listId, productId) => privateAPI.delete(`/lists/${listId}/products/${productId}` )
export const editProduct = (listId, productId, productData) => privateAPI.patch(`/lists/${listId}/products/${productId}`, productData)
export const selectProduct = (listId, productId) => privateAPI.patch(`/lists/${listId}/products/${productId}/select`)

export const getProducts = () => API.get("/products")
export const addProduct = (productData) => privateAPI.post("/products", productData, {
    headers:{
        "Content-Type": "multipart/form-data; boundary=gc0p4Jq0M2Yt08jU534c0p",
    }
} )
export const deleteProduct = (productId) => privateAPI.delete(`/products/${productId}`)
export const updateProduct = (productId, productData) => privateAPI.patch(`/products/${productId}`, productData, {
    headers:{
        "Content-Type": "multipart/form-data; boundary=gc0p4Jq0M2Yt08jU534c0p",
    }
})

export const getCategories = () => API.get("/categories")
export const addCategory = (categoryData) => privateAPI.post("/categories", categoryData )
export const deleteCategory = (categoryId) => privateAPI.delete(`/categories/${categoryId}`)
export const updateCategory = (categoryId, categoryData) =>  privateAPI.patch(`/categories/${categoryId}`, categoryData)
