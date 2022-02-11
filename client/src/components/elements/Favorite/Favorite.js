import React, { useState} from 'react'
import { Button} from '@material-ui/core' ;
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {removeFromFavorite,addToFavorite,checkFavorite,getFavorites} from '../../../actions/favorite';
import { Alert } from 'antd';
function Favorite(props) {
  var userLogged = null;
    if(localStorage.getItem('profile') != null){
    userLogged = JSON.parse(localStorage.getItem('profile')).result.email ;
    } 

    const initialState = {userFrom: userLogged,movieId: props.movieId, movieTitle : props.movieTitle , movieImage: props.movieImage};
    const [FavoriteNumber,setFavoriteNumber] = useState(0)
    const [Favorited,setFavorited] = useState(false)
    const [submitted,setSubmitted] = useState(false)
    const [msgSet, setMsgSet] = useState(true)
    const [msg,setMsg] = useState('');
    const dispatch = useDispatch();
    var [formData,setFormData] = useState(initialState);
const history = useHistory();
const buttonStyle = {
  marginRight:'0.5rem',
};

const favButtonStyle = {
  margin:'2.5rem',
};

dispatch(checkFavorite(formData,history)).then(function (res) {

    setFavorited(true)
  })
  .catch(function (error) {
if(error.response){ //alert('error in check fav comp'+error.response.data.message);
setFavorited(false)
}else{
  setFavorited(true)
}

  });




   dispatch(getFavorites(formData,history)).then(function(response) {
    setFavoriteNumber(localStorage.getItem('favCount'))
})

  .catch(function (error) {
if(error.response){ 
}else{

}

  });
  // const closeHandle = (e)=>{
  //   history.push('/movie/'+props.movieId)
  // }

    const handleSubmit = (e)=>{
      
      e.preventDefault();
      setFormData(initialState);
      setSubmitted(true)
      const formSubmitData = {userFrom: initialState.userFrom,movieId: initialState.movieId, movieTitle : initialState.movieTitle , movieImage: initialState.movieImage};
      if(userLogged == null){
           
              setMsg("Please login to add to Favorites!")
              setMsgSet(true)
             history.push('/movie/'+props.movieId)
      }else{
        if(Favorited){
                   dispatch(removeFromFavorite(formSubmitData,history)).then(function (response) {
                          setFavorited(false)
                          setMsgSet(false)
                          history.push('/movie/'+props.movieId)
                        }) .catch(function (error) {
                        setMsgSet(false)
                          history.push('/movie/'+props.movieId)
                          if(error.response){ 
                            setMsgSet(false)
                            history.push('/movie/'+props.movieId)
                          }else{
                            setMsgSet(false)
                            history.push('/movie/'+props.movieId)
                          }
                        });
          }else{
            dispatch(addToFavorite(formSubmitData,history)).then(function (response) {
              setFavorited(true)
              // setMsg('Movie Added To Favorite!')
              // setMsgSet(true)
              setMsgSet(false)
                history.push('/movie/'+props.movieId)

              }).catch(function (error) {
                // setMsg('Movie Added To Favorite!')
                // setMsgSet(true)
                setMsgSet(false)
                  history.push('/movie/'+props.movieId)
                  if(error.response){ 
                    // setMsg('Movie Added To Favorite!')
                    // setMsgSet(true)
                    setMsgSet(false)
                    history.push('/movie/'+props.movieId)
                  }else{
                    // setMsg('Movie Added To Favorite!')
                    // setMsgSet(true)
                    setMsgSet(false)
                    history.push('/movie/'+props.movieId)
                  }
                });
              
          }
      }
    }


    return (
        <form  onSubmit={handleSubmit}>
       
            <div style={{display:'flex',justifyContent:'flex-end',width: '85%'}}>   
            {/* {FavoriteNumber} */}
                  <Button style={{marginRight:'1rem',  backgroundColor:'rgb(255, 203, 5)',textTransform: 'capitalize', color: 'black'}} variant="contained" color="warning" disabled="true">  Favorite Count: 14</Button>
                        
                    <Button   type="submit" color="secondary" variant="contained" className="classes.submit" half>
                    {Favorited ? "Remove from Favourite!" : "Add to Favourite!"} 
                </Button>
                {submitted && msgSet && <Alert  description={msg}
                    type="warning" showIcon closable style={{color: `black`,width:'100%', 
                    margin:'15 rem',justifyContent:'center'}} />}
    
    </div>
    </form>
    )
}

export default Favorite;