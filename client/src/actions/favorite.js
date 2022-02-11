import { FAV,FAVUSER,FAVREM} from '../constants/actionTypes';

import * as api from '../api/index.js';


export const removeFromFavorite = (formData,history) => async (dispatch) =>{
 
        try{
             
                const {data} = await api.removeFromFavorite(formData)
      
                dispatch({type:FAVREM,data});
                history.push('/');
            }catch(error){
                history.push('/');
            }

}

export const addToFavorite = (formData,history) => async (dispatch) =>{

    try{

        const {data} = await api.addToFavorite(formData);

        dispatch({type:FAV,data});
        history.push('/');
    }catch(error){
        console.log(error);
    }
}


export const checkFavorite = (formData,history) => async (dispatch) =>{


        const {data} = await api.checkFavorite(formData);

}


export const getFavorites = (formData,history) => async (dispatch) =>{


        const {data} = await api.getFavorites(formData);
        const ans = data.message;
        dispatch({type:FAV,ans});
        localStorage.setItem('favCount',data.result) ;

}


export const getUserFavorite = (formData,history) => async (dispatch) =>{

    try{
        const {data} = await api.getUserFavorite(formData);

    dispatch({type:FAVUSER,data})
        localStorage.setItem('favUsers',data.message) ;
    }catch(error){
       // console.log(error);
    }


}







