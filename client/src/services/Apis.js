import { commonRequest } from "./ApiCall"
import { BASE_URL } from "./Helper";

export const registerFunc = async (data,headers) =>{
    return await commonRequest("POST",`${BASE_URL}/api/v1/register`,data,headers);
};

// Login
export const loginFunc = async (data,headers) =>{
    return await commonRequest("POST",`${BASE_URL}/api/v1/login`,data,headers);
};
// Login
export const forgotPassFunc = async (data,headers) =>{
    return await commonRequest("POST",`${BASE_URL}/api/v1/forgot-password`,data,headers);
};

// User login or not check
export const isLoggedIn = async (data,headers) =>{
    return commonRequest('GET',`${BASE_URL}/api/v1/user-auth`,data,headers);
}
// admin check
export const isAdmin = async (data,headers) =>{
    return commonRequest('GET',`${BASE_URL}/api/v1/admin-auth`,data,headers);
}

// update user details
export const updateUserDetails = async(data,headers) =>{
    return commonRequest('PUT',`${BASE_URL}/api/v1/profile`,data,headers);
}
// create category
export const createCategory = async (data, headers) => {
    return commonRequest('POST', `${BASE_URL}/api/v1/category/create-category`, data, headers);
};
// get all categories
export const getAllCategories = async (data, headers) => {
    return commonRequest('GET', `${BASE_URL}/api/v1/category/get-category`, data, headers);
};

// update category
export const updateCategory = async (categoryId, data, headers) => {
    return commonRequest('PUT', `${BASE_URL}/api/v1/category/update-category/${categoryId}`, data, headers);
};

//delete category
export const deleteCategory = async (Id, data, headers) => {
    return commonRequest('DELETE', `${BASE_URL}/api/v1/category/delete-category/${Id}`, data, headers);
};

//create product
export const fetchProduct = async ( data, headers) => {
    return commonRequest('POST', `${BASE_URL}/api/v1/product/create-product`, data, headers);
};

//get all product
export const getAllProducts = async ( data, headers) => {
    return commonRequest('GET', `${BASE_URL}/api/v1/product/get-product`, data, headers);
};

//get single product
export const getSingleProducts = async ( params,data, headers) => {
    return commonRequest('GET', `${BASE_URL}/api/v1/product/get-product/${params}`, data, headers);
};

//update product
export const updateProduct = async ( id,data, headers) => {
    return commonRequest('PUT', `${BASE_URL}/api/v1/product/update-product/${id}`, data, headers);
};
//delete product
export const deleteProduct = async ( id,data, headers) => {
    return commonRequest('DELETE', `${BASE_URL}/api/v1/product/delete-product/${id}`, data, headers);
};
//filter product
export const getfilteredProduct = async ( data, headers) => {
    return commonRequest('POST', `${BASE_URL}/api/v1/product/product-filter`, data, headers);
};

// get total count
export const getTotalCount = async ( data, headers) => {
    return commonRequest('GET', `${BASE_URL}/api/v1/product/product-count`, data, headers);
};

//get all product
export const getAll = async ( page,data, headers) => {
    return commonRequest('GET', `${BASE_URL}/api/v1/product/product-list/${page}`, data, headers);
};
//search product
export const search = async ( keyword,data, headers) => {
    return commonRequest('GET', `${BASE_URL}/api/v1/product/search/${keyword}`, data, headers);
};
//similar product
export const getRelatedProducts = async ( pid,cid,data, headers) => {
    return commonRequest('GET', `${BASE_URL}/api/v1/product/related-product/${pid}/${cid}`, data, headers);
};
// products by category from headers
export const getProductsByCat = async ( slug,data, headers) => {
    return commonRequest('GET', `${BASE_URL}/api/v1/product/product-category/${slug}`, data, headers);
};
// place order
export const placeOrder = async ( data, headers) => {
    return commonRequest('POST', `${BASE_URL}/api/v1/product/create-payment`, data, headers);
};
// add order
export const addOrder = async ( data, headers) => {
    return commonRequest('POST', `${BASE_URL}/api/v1/product/add-order`, data, headers);
};
// get order
export const fetchOrders = async ( data, headers) => {
    return commonRequest('GET', `${BASE_URL}/api/v1/orders`, data, headers);
};
// get all orders (for admin)
export const fetchAllOrders = async ( data, headers) => {
    return commonRequest('GET', `${BASE_URL}/api/v1/all-orders`, data, headers);
};
// update order status
export const orderStatus = async ( orderId,data, headers) => {
    return commonRequest('PUT', `${BASE_URL}/api/v1/order-status/${orderId}`, data, headers);
};
