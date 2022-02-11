import React, { useState,useEffect } from 'react'
import {API_KEY, API_URL, IMAGE_URL, VIDEO_URL,POSTER_SIZE} from '../../config';
import MovieDetailMain from '../MovieDetailMain/MovieDetailMain'

import { Card,Button,Alert } from 'antd';
import './PopMovieDetails.css';
//import Recommendations from '../Recommendations/Recommendations'
import SearchCard from '../SearchCard/SearchCard.js'
import Favorite from '../../components/elements/Favorite/Favorite';
import WriteReview from '../../components/elements/Review/WriteReview';
import ReadReview from '../../components/elements/Review/ReadReviews';

import {
    EmailShareButton,  
    FacebookShareButton,
    PinterestShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton
  } from "react-share";



function PopMovieDetail(props){
    const [movieDetail,setMovieDetail]=useState([])
    const [movieRecommender,setmovieRecommender]=useState([])
    const [currentPage,setCurrentPage] = useState(0);
    const [error,setError]=useState(false);
   const [errorVideo,setErrorVideo] =useState(false);
    const movieId=props.match.params.movieId;
// var img , title = ''
    useEffect(()=>{

   

        try{
            setErrorVideo(false);
            fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US&page=1&append_to_response=videos`)       
            .then(response =>response.json())
            .then(response =>{
                console.log(response);
                setMovieDetail(response);
                if(!response.videos.results.length){
                    setErrorVideo(true);
                }
            })           
        }
        catch(error){
            setErrorVideo(true);
         }

            try{
                setError(false);
                     const recUrl=`${API_URL}movie/${movieId}/recommendations?api_key=${API_KEY}&language=en-US&page=${currentPage+1}`
                     fetch(recUrl)
                     .then(response =>response.json())
                    .then(response =>{
                    console.log(response);
                    setmovieRecommender(response.results);
                    if(!response.results.length){
                        setError(true);
                    }
                    setCurrentPage(response.page);
                        })
             }
             catch(error){
                setError(true);
             }       
    },[])
    return(
        <div>   
            {/*Main image in the body */}
            {   
              movieDetail.videos && movieDetail.videos.results && movieDetail.videos.results[0] &&
                //since the time to load backdrop_path is more than loading entire component
                //we need to specify movieDetail &&<PopularMain/>
                //otherwise just <PopularMain/> is fine
                //video={`${VIDEO_URL}${movieDetail.videos[0].key}`} 
                //image={`${IMAGE_URL}w1280${movieDetail.backdrop_path && movieDetail.backdrop_path}`} 
         
                <MovieDetailMain video={`${VIDEO_URL}${movieDetail.videos.results[0].key && movieDetail.videos.results[0].key}?autoplay=1&mute=1`} 
                    title={movieDetail.title} text={movieDetail.overview} />

           
            }  
                
                {
                    errorVideo &&  <Alert
                    style={{color: `black`,width:'100%',margin:'15 rem',display: 'flex', flexDirection:'row',
                            justifyContent:'flex-start'}}               
                    description=" Video is unavailable"
                    type="info"
                    showIcon
                  />
                }


            {/* 
            !movieDetail.videos && <p> Trailer is unavailable for this movie!!</p>
            */
            }
            <br/>
            {/*Body of detail page */}
            <div style={{width:'85%',margin:'1 rem auto'}}>
            <div style={{display:'flex',justifyContent:'flex-end',margin:'1rem'}}>
                            <span style={{paddingRight:'0.5rem'}}>
                                {

                                        <FacebookShareButton
                                                url={movieDetail.homepage != "" ? movieDetail.homepage : "https://www.themoviedb.org/?language=en-US"}
                                                quote={movieDetail.title != ""? movieDetail.title + " is awesome check it out" : "This movie is awesome check it out"}                                              
                                                className="share">                             
                                        <img src='/fb.png' alt="facebook"  height="30px" width="30px"></img>
                                        </FacebookShareButton>

                                }
                                        &nbsp;                    
                                </span>
                                <span style={{paddingRight:'0.5rem'}}>
                                    <TwitterShareButton
                                            url={movieDetail.homepage != "" ? movieDetail.homepage : "https://www.themoviedb.org/?language=en-US"}
                                            title={movieDetail.title != ""? movieDetail.title + " is awesome check it out" : "This movie is awesome check it out"}
                                         className="share">
                                        <img src='/tweet.png' alt="twitter"  height="30px" width="30px"></img>
                                    </TwitterShareButton>
                                    &nbsp;
                                    </span >
                                    <span style={{paddingRight:'0.5rem'}}>
                                    <TelegramShareButton
                                             url={movieDetail.homepage != "" ? movieDetail.homepage : "https://www.themoviedb.org/?language=en-US"}
                                           title={movieDetail.title != ""? movieDetail.title + " is awesome check it out" : "This movie is awesome check it out"}
                                        className="share">
                                             <img src='/tel2.png' alt="telegram"  height="30px" width="30px"></img>
                                        </TelegramShareButton>
                                        &nbsp;
                                        </span>
                                        <span style={{paddingRight:'0.5rem'}}>
                                        <WhatsappShareButton
                                                   url={movieDetail.homepage != "" ? movieDetail.homepage : "https://www.themoviedb.org/?language=en-US"}
                                                title={movieDetail.title != ""? movieDetail.title + " is awesome check it out" : "This movie is awesome check it out"}
                                                separator=":: "
                                                className="share">
                                              <img src='/whatsapp_logo.png' alt="whatsapp"  height="30px" width="30px"></img>
                                            </WhatsappShareButton>
                                            
                                        </span>
                                        <span style={{paddingRight:'0.5rem'}}>
                                        <PinterestShareButton
                                               url={movieDetail.homepage != "" ? movieDetail.homepage : "https://www.themoviedb.org/?language=en-US"}
                                            media={movieDetail.poster_path && `${IMAGE_URL}w500${movieDetail.poster_path}`}
                                            className="share">
                                            <img src='/pinterest_logo.png' alt="pinterest"  height="30px" width="30px"></img>
                                        </PinterestShareButton>

                                            </span>
                                            <span  style={{paddingRight:'1rem'}}>
                                            <EmailShareButton
                                                url={movieDetail.homepage != "" ? movieDetail.homepage : "https://www.themoviedb.org/?language=en-US"}
                                            
                                               body = "This movie is awesome, check it out at"
                                               subject={movieDetail.title}  
                                               className="share">
                                                 <img src='/mail_logo.png' alt="mail"  height="30px" width="30px"></img>
                                            
                                            </EmailShareButton>
                                                </span>
                        <div>
                                <Favorite userFrom={localStorage.getItem('userId')} movieId={movieId} 
                                movieTitle={movieDetail.title} 
                                movieImage={(movieDetail.poster_path ? `${IMAGE_URL}${POSTER_SIZE}${movieDetail.poster_path}` : 
                                './images/no_image.jpg')}/>                      
  
                       
                        </div> 
                       
                        </div>
               
                        
                        <br/>
                            {/*Info of detail page                  
                            */}
                                
                    <Card bordered={false} style={{color: 'black',width: '85%',margin:'1rem auto'}}>
                    <Card.Grid  style={{width: '100%'}}>
                                <div style={{ color: 'black', fontSize: '2.5rem', display:'flex',flexDirection:'row',
                                                        justifyContent:'flex-start',fontWeight:'bolder',textTransform:'uppercase'}}> 
                                {movieDetail.title} 
                                </div>
                        </Card.Grid>
                        <Card.Grid style={{width: '100%'}}>
                                <div style={{ color: 'black', fontSize: '1rem', display:'flex',flexDirection:'row',
                                                        justifyContent:'flex-start',fontWeight:'bolder',textTransform:'none'}}> 
                                {movieDetail.overview} 
                                </div>
                        </Card.Grid>
                        <Card.Grid  style={{width: '100%'}}>
                                <div style={{ color: 'black', fontSize: '1rem', display:'flex',flexDirection:'row',
                                                justifyContent:'flex-start',fontWeight:'bolder',textTransform:'none'}}>
                                Status : {movieDetail.status}
                                </div>
                        </Card.Grid>    
                        <Card.Grid  style={{width: '100%'}}>
                                <div style={{ color: 'black', fontSize: '1rem', display:'flex',flexDirection:'row',
                                                justifyContent:'flex-start',fontWeight:'bolder',textTransform:'none'}}>
                                Rating : {movieDetail.vote_average}
                                </div>
                        </Card.Grid> 
                        <Card.Grid  style={{width: '100%'}}>
                                <div style={{fontWeight:'bolder',textTransform:'none',fontSize: '1rem',display:'flex',flexDirection:'row',
                                                justifyContent:'flex-start'}}>
                               Release Date : {movieDetail.release_date}
                                </div>
                        </Card.Grid> 
                        <Card.Grid  style={{width: '100%'}}>
                                <div style={{fontWeight:'bolder',textTransform:'none',fontSize: '1rem',display:'flex',flexDirection:'row',
                                                justifyContent:'flex-start'}}>
                                For more details: Visit <a href={movieDetail.homepage} target="_blank" style={{paddingLeft: '0.5%'}}>here</a>
                                </div>
                        </Card.Grid>          
                    </Card>
                    <br/>
                    <br/>
                    <div style={{color: 'black',width: '85%',margin:'1rem auto',textTransform:'uppercase',fontWeight:'bolder'}}>
                        <h1 style={{color:'white'}}>RECOMMENDATIONS</h1>
                            <br/>
                        {
                            
                            error && 
                                 <Alert style={{color: `black`,margin:'15 rem',display: 'flex', flexDirection:'row',
                            justifyContent:'flex-start'}}     
                                    description=" No recommendations are available for this movie"
                                    type="info"
                                    showIcon/>
                             
                        }
                    </div>

                    {
                            (error ==true)?( <div className="empty">
                            </div>):(
                        
                                <div className="card" style={{width: '85%',margin:'1rem auto'}}>
                                        {
                                            //,display:'flex',flexDirection:'row',overflowX:'scroll'
                                        //return only movies which has image i.e poster path
                                        //.filter(movieRec=>movieRec.poster_path && movieRec.vote_average && movieRec.release_date)
                                        }
                                    <div className="card-items">
                                        {movieRecommender.filter(movieRec=>movieRec.poster_path && movieRec.vote_average && movieRec.release_date).map(movieRec=>
                                            (<SearchCard movieRec={movieRec} key={movieRec.id}/>)
                                        )}
                                    </div>
                                </div>
                            )}
            
                    
                    <div style={{color: 'black',width: '85%',margin:'1rem auto',textTransform:'uppercase',fontWeight:'bolder'}}>
                        <h1 style={{color:'white'}}>Movie Reviews</h1>
                            <br/>
                    </div>

                    <div className="card" style={{width: '85%',margin:'1rem auto'}}>
                           <div className="card-items">
                           <WriteReview userFrom={localStorage.getItem('userId')} movieId={movieId}/>
                        </div>
                    </div>

                    <div className="card" style={{width: '85%',margin:'1rem auto'}}>
                        <div className="card-items">
                        <ReadReview userFrom={localStorage.getItem('userId')} movieId={movieId}/>
                        </div>
                    </div>
                    
            </div>    
        </div>
    )
}
export default PopMovieDetail;