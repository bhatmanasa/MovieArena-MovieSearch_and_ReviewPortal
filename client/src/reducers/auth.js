import { AUTH, LOGOUT,FAVUSER ,FAVREM,REVMOV} from '../constants/actionTypes';

const authReducer = (state ={authDate : null },action) => {
    switch(action.type){
        case AUTH:
            console.log('Setting User profile to local storage - profile')
              localStorage.setItem('profile',JSON.stringify({ ...action?.data}));
              localStorage.setItem('userEmail',JSON.stringify({ ...action?.data.email}));
              return { ...state, authDate:action?.data};
        case LOGOUT:
            console.log('Clearing user profile from local storage')
            localStorage.clear();
            return { ...state, authDate:null};   
        case FAVUSER:
            console.log('Setting User Favorite Movies to local storage - reducerFavs')
                localStorage.setItem('reducerFavs',JSON.stringify({ ...action?.data}));
                localStorage.setItem('addUser',true);
                break;
        case REVMOV:
                console.log('Setting Movie Reviews to local storage - movieFavs')
                localStorage.setItem('movieFavs',JSON.stringify({ ...action?.data}));
                 break;
        case FAVREM:
                    console.log('Setting Movie Remove ')
                    localStorage.setItem('remUser',true);
                    break;
                   
        default:
          return state;
                  
    }
}

export default authReducer;