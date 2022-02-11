import express from 'express';

import {writeReview,getMovieReviews} from '../controllers/review.js';

const router= express.Router();
router.post('/writeReview',writeReview);
router.post('/getMovieReviews',getMovieReviews);


export default router;

