import {REVMOV,REVIEW} from '../constants/actionTypes';

import * as api from '../api/index.js';



export const writeReview = (formData,history) => async (dispatch) =>{

    try{
        const {data} = await api.writeReview(formData);
        dispatch({type:REVIEW,data});
        history.push('/');
    }catch(error){
        console.log(error);
    }
}



export const getMovieReviews = (formData,history) => async (dispatch) =>{

     try{
         const {data} = await api.getMovieReviews(formData);
         dispatch({type:REVMOV,data});
     
     }catch(error){
       //  console.log(error);
     }
 }