import axios from 'axios';


const API = axios.create({baseURL:'http://localhost:5000'})


export const signIn = (formData) => API.post('/user/signin',formData);
export const signUp = (formData) => API.post('/user/signup',formData);
export const searchMov = (formData) => API.post('/searchMovie',formData);
export const removeFromFavorite = (formData) => API.post('/api/favorite/removeFromFavorite',formData);
export const addToFavorite = (formData) => API.post('/api/favorite/addToFavorite',formData);
export const checkFavorite = (formData) => API.post('/api/favorite/checkFavorite',formData);
export const getFavorites = (formData) => API.post('/api/favorite/getFavorites',formData);
export const getUserFavorite = (formData) => API.post('/api/favorite/getUserFavorite',formData);
export const writeReview = (formData) => API.post('/api/review/writeReview',formData);
export const getMovieReviews = (formData) => API.post('/api/review/getMovieReviews',formData);
