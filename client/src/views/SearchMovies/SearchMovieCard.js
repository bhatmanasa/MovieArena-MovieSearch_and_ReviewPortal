import React from "react";
import { FcRating } from "react-icons/fc";
import './SearchMovieCard.css'


export default function Card({movie}){
    return(
        <div className="card" >
             <a href={`/movie/${movie.id}`}> 
                <img className="card--image"
                src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                alt={movie.title +'poster'}/> 
                </a>
                <div className="card--content">
                    <h2 className="card--title">
                    {movie.title}    
                    </h2>     
                    <h2 className="card--release">Release Date:{movie.release_date}</h2>                              
                    <h2 className="card--rating">
                    <span className="fa fa-star checked" style={{color:'rgb(255, 203, 5)',fontWeight:'bolder',fontSize:'2rem',paddingRight:'0.6rem'}}>                            
                            </span>
                           {movie.vote_average}
                        </h2>                   
                    <p className="card--desc">
                   
                    </p>
                  
                </div>   
        </div>
    )
}