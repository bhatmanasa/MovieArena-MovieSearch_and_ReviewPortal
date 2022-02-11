import React from "react";
import { FcRating } from "react-icons/fc";
//import {  Card, Col, Row  } from 'antd';
import './SearchCard.css'

//movie recommendation cards
export default function SearchCard({movieRec}){
    return(
                    <div className="card-item">                       
                        <p className="card-item_image">   
                        <a href={`/movie/${movieRec.id}`}>                  
                        <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movieRec.poster_path}`} alt={movieRec.title +'poster'}/>
                        </a>
                        </p>     
                        <div style={{textAlign:'center'}}>      
                        <p className="card-item_title" ><b>{movieRec.title}</b></p>              
                        <p className="card-item_release" ><b>Released On:{movieRec.release_date}</b></p>                              
                        <p className="card-item_rating" >
                            {//<FcRating size={20}/>
                            } 
                            <span className="fa fa-star checked" style={{color:'rgb(255, 203, 5)',fontWeight:'bolder',fontSize:'2rem',paddingRight:'0.6rem'}}>                            
                            </span>
                            {movieRec.vote_average}
                        </p>
                        </div>
                    </div>   
    )
}
    
