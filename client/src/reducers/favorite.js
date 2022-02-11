import { FAV,FAVUSER } from '../constants/actionTypes';

const favoriteReducer = (action) => {
    switch(action.type){
        case FAV:
        //  console.log('reached reducer: '+data.result)
            localStorage.setItem('fav',JSON.stringify({ ...action?.data}));
          //    return { ...state, authDate:action?.data}; 
        case FAVUSER:
        //  alert('reached reducer: '+data)
          localStorage.setItem('reducerFavs',JSON.parse({ ...action?.data}));

          localStorage.setItem('userFavs',JSON.stringify({ ...action?.data}));
        //  alert('parsed='+localStorage.getItem('reducerFavs'))
        default:
          return state;
                  
    }
}

export default favoriteReducer;