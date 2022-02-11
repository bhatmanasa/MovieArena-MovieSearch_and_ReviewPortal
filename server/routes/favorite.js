import express from 'express';

import {favoriteNumber,favorited, addToFavorite,removeFromFavorite,checkFavorite,getFavorites,getUserFavorite} from '../controllers/favorite.js';

const router= express.Router();
router.post('/favorite',favoriteNumber);
router.post('/favorited',favorited);
router.post('/addToFavorite',addToFavorite);
router.post('/removeFromFavorite',removeFromFavorite);
router.post('/checkFavorite',checkFavorite);
router.post('/getFavorites',getFavorites);
router.post('/getUserFavorite',getUserFavorite);


export default router;

