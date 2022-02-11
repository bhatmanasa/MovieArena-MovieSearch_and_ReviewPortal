import React,{useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {getUserFavorite} from '../../actions/favorite';
import './UserProfile.css';
import { Alert } from 'antd';
import { Typography,Container,Paper,Button,Grid } from '@material-ui/core';

const UserProfile =()=>{
    const [submitted, setSubmitted] = useState(false);
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    var userLogged = null;
    var store = null;
    const dispatch = useDispatch();
    const history = useHistory();
    if(localStorage.getItem('profile') != null){
        userLogged = JSON.parse(localStorage.getItem('profile')).result.email ;
        } 
        const initialState = {userFrom: userLogged};
        const [formData,setFormData] = useState(initialState);
        const favMovies = localStorage.getItem('reducerFavs')
if(favMovies != null){
    store = JSON.parse(localStorage.getItem('reducerFavs')).userFavs;
}

const renderFavElements = () => {
    if((localStorage.getItem('reducerFavs')) !=null){
    store = JSON.parse(localStorage.getItem('reducerFavs')).userFavs;
    }
    if(store != null){
    if(store.length === 0){

        const gridElements = 
         (
            <Alert  description="No Favorites to show!"
            type="info" showIcon closable style={{color: `black`,width:'100%',
            margin:'15 rem',display: 'flex', flexDirection:'row',justifyContent:'center'}} />
        )

        return gridElements;
    }else{
    const gridElements = store.map( (movie, i) => {
        return (
            <div key={i}>
        <h4> {movie.movieTitle}</h4>
        <a href={`/movie/${movie.movieId}`}>     
            <img src={movie.movieImage} height="150px" width="150px"></img>             
                        </a>
           </div>
        )
    });
    return gridElements;
}
}
   
}
    
const handleSubmit = (e)=>{
    e.preventDefault();

    setSubmitted(true)
        if(userLogged != null){
            const formSubmitData = {userFrom: initialState.userFrom};
        dispatch(getUserFavorite(formSubmitData,history))
        
        .then(function(response) {
          history.push('/profile')
        })  
        };
    if(JSON.parse(localStorage.getItem('reducerFavs')) != null){
    store = JSON.parse(localStorage.getItem('reducerFavs')).userFavs;
    }

}

    
   
return(

<div className="profileDiv">
{userLogged && (<>
<Container component="main" maxWidth="xl" className="profilepageDiv">
        <Paper elevator={3}>

            <Typography variant="h4" style={{ padding:'2rem', color: `rgba(224, 66, 66, 0.925`}}>
              View your Profile Page
            </Typography>
<table>
    <tr>
        <td><b>Name: {user.result.name}</b></td>
        
    </tr>
    <tr>
    <td><b>Email Id: {user.result.email}</b></td>
    </tr>
    </table>

    <form onSubmit={handleSubmit}>

    <Button type="submit" color="secondary" variant="contained" className="classes.submit" style={{margin:'2rem'}} half>
        View Your Favorites
    </Button>
   
            <br>
            </br>
            <br>
            </br>
            <div class="grid-view">
            <Grid container spacing={2} style={{width:'80%'}}> 
        {submitted && 
    <div className="rmdb-grid-content">
         {renderFavElements()}
         <br></br>
        </div>}
    

</Grid>
</div>
</form>

        </Paper>
    </Container>
    </>)}





    {!userLogged && (<> 
        <Alert  description="Please login/register to view the Profile page!"
                    type="error" showIcon closable style={{color: `black`,width:'100%',
                    margin:'15 rem',display: 'flex', flexDirection:'row',justifyContent:'center'}}/>

            </>)
}

</div>


)
}



export default UserProfile;