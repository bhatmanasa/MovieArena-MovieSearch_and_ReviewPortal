import React,{useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {getMovieReviews} from '../../../actions/review';
import { Typography,Container,Avatar,Paper,Grid,Button } from '@material-ui/core';
import './reviewStyles.css';
import { Alert } from 'antd';
import { Card } from 'antd';
//const initialState = {firstName: '',lastName: '', email : '' , password: '', confirmPassword: ''}; 
const ReadReviews =(props)=>{
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    var userLogged = null;
    if(localStorage.getItem('profile') != null){
        userLogged = JSON.parse(localStorage.getItem('profile')).result.email ;
        } 

    const initialState = {movieId: props.movieId};
    const [formData,setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const [movieFavs,setMovieFavs] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    var store = null ;
const history = useHistory();
const handleSubmit = (e)=>{
    e.preventDefault();
    setSubmitted(true)
    if(userLogged != null){
        setLoggedIn(true)
        dispatch(getMovieReviews(formData,history))
        .then(function(response) {
         renderReviewElements()
            history.push('/movie/'+props.movieId)
        })
   
    
    }else{
        setLoggedIn(false)
    }

}



const renderReviewElements = () => {
   
   if(submitted){
   if(localStorage.getItem('movieFavs') != null){
   store = JSON.parse(localStorage.getItem('movieFavs')).revMovs;
   store= [{_id:'611429549ae2b14d7a1a8e1b',userFrom:"riya@gmail.com",movieId:"968",reviewMessage:"Funny! Do watch this movie if you like heist suspense and thriller!",currDate:"Wed Aug 11 2021 15:47:32 GMT-0400 (Eastern Daylight Time)",__v:0},
   {_id:'611429549ae2b14d7a1a8e1c',userFrom:"david@gmail.com",movieId:"968",reviewMessage:"Best Family movies in recent times!",currDate:"Wed Aug 09 2021 09:47:32 GMT-0400 (Eastern Daylight Time)",__v:0},
   {_id:'611429549ae2b14d7a1a8e1d',userFrom:"charulatha@gmail.com",movieId:"968",reviewMessage:"Liked the casting and direction. Worth the wait!",currDate:"Wed Aug 11 2021 15:40:32 GMT-0400 (Eastern Daylight Time)",__v:0}];
    if(store!=null){
    if(store.length === 0){

        const gridElements = 
         (
            <div>
                <h3 style={{color: 'rgb(204, 0, 102)'}}>
                    There are no reviews yet for this movie!
                    </h3>
            </div>
        )

        return gridElements;
    }else{
        const gridElements = store.map( (movie, i) => {
            return (
                <div style={{ width: '80%'}}>
<Card bordered={false} style={{color: 'black',width: '100%',margin:'1rem auto'}}>
                    <Card.Grid  style={{width: '100%'}}>
                         
                <p style={{color: `black`}} ><u>From: {movie.userFrom}</u></p>   
                <p   style={{color: `rgb(0, 28, 32)`, fontSize: '8px'}}    >({movie.currDate})</p>
                <p style={{color: 'rgb(204, 0, 102)'}}><i>"{movie.reviewMessage} "</i></p>
    
                        
                        </Card.Grid>
                               
                    </Card>

                    </div>

            )
        });
        return gridElements;
    }

  
}
   }
}
}
    
    
    
    



return(
 


    <Container component="main" maxWidth="xl">
        <Paper elevator={3}>
       
            <Typography variant="h5">
           
            </Typography>
            <form onSubmit={handleSubmit}>
    <Grid container spacing={2}> 

        <Button type="submit" color="secondary" variant="contained" className="classes.submit" half>
        View Reviews 
    </Button>
        {submitted && !loggedIn && <Alert  description="Please login to View Reviews for this Movie!"
                    type="error" showIcon closable style={{color: `black`,width:'100%',
                    margin:'15 rem',justifyContent:'center'}} />}





                    
    </Grid>
            </form>
            <br>
            </br>
            <br>
            </br>
        {submitted && <div>{renderReviewElements()}</div>}

        </Paper>
    </Container>

)
}


export default ReadReviews;