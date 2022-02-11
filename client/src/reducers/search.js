import { SEARCH } from '../constants/actionTypes';

const searchReducer = (state ={authDate : null },action) => {
    switch(action.type){
        case SEARCH:
              localStorage.setItem('search',JSON.stringify({ ...action?.data}));
              return { ...state, authDate:action?.data};
        default:
          return state;
                  
    }
}

export default searchReducer;