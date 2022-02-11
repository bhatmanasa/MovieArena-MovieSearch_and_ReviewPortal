
import React, { useState} from 'react'
import {  Button, Paper, Grid, Typography, Container} from '@material-ui/core' ;
import Input from './input';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {writeReview} from '../../../actions/review';
import './reviewStyles.css';
import { Alert } from 'antd';
function WriteReview(props) {


  var userLogged = null;
    if(localStorage.getItem('profile') != null){
    userLogged = JSON.parse(localStorage.getItem('profile')).result.email ;
    } 

    const initialState = {reviewMessage: '', movieId: props.movieId, userFrom: userLogged}; 
    const dispatch = useDispatch();
    const [msg,setMsg] = useState('')
    const [msgSet,SetmsgSet] = useState(false)
    const [submitted, setSubmitted] = useState(false);
    const [formData,setFormData] = useState(initialState);
    const history = useHistory();



    const handleSubmit = (e)=>{
     
      setFormData({ ...formData,[e.target.name]:e.target.value});
      e.preventDefault();
      setSubmitted(true)
      if(userLogged == null){
             // alert("Please login to Write reviews!")
             setMsg("Please login to Write reviews!")
             SetmsgSet(true)
      }else{
        if (!formData.reviewMessage){
          setMsg("Review field is mandatory to write a review!")
          SetmsgSet(true)
      }else{
        dispatch(writeReview(formData,history)).then(function (response) {
          setMsg("Movie Review added successfully!")
         alert('Movie Review added successfully!')
          SetmsgSet(true)
          history.push('/movie/'+props.movieId)
            })
          } 
              
          }
        }
      
    
      const handleChange = (e)=>{
        setFormData({ ...formData,[e.target.name]:e.target.value});
        // alert(formData.reviewMessage);
    };

   
    return (

<div style={{width:'100%'}}>
<Container component="main" style={{width:'80%'}}>
<Paper elevator={3}>
    <Typography variant="h5">
    </Typography>
    <form onSubmit={handleSubmit} style={{width:'80%'}}>
    <Grid container spacing={2}> 
    <Input name="reviewMessage" label="Write a Review" handleChange={handleChange} autoFocus style={{height: '100%', width:'100%'}} half />
    {/* <Input name="reviewMessage" label="Write a Review" handleChange={handleChange} autoFocus fullWidth /> */}
    <Button type="submit" color="secondary" variant="contained" className="submitBtn" style={{marginTop:'1%'}}half>
    Submit Review
    </Button>
    {submitted && msgSet &&  <Alert  description={msg}
                    type="error" showIcon closable style={{color: `black`,width:'100%',
                    margin:'15 rem',display: 'flex', flexDirection:'row',justifyContent:'center'}} />}
    </Grid>
            </form>
        </Paper>
    </Container>

    </div>
    )
}

export default WriteReview;