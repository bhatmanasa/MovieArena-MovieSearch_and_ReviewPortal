import React, { useState } from 'react';
import SearchMovieCard from './SearchMovieCard'
import { FaSearch } from 'react-icons/fa';
import './SearchMovieCard.css'
import { Alert } from 'antd';
import {  Button, Tooltip  } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export default function SearchMovies(){
    const [query,setQuery]=useState('');// useState() returns an array which contains query and setQuery() 
    const [movies,setMovies]=useState([]);
    const [error,setError]=useState(false);
    const[empty,setEmptyError]=useState(false);

    const searchMovies = async(e)=>{
        e.preventDefault();//inorder to remove the query param in url 
        //and to avoid page refresh we used this event
        setEmptyError(false);
        const url = `https://api.themoviedb.org/3/search/movie?api_key=b9bdc43cbc40c09f2e7105b49c3aa2ce&language=en-US&query=${query}&page=1&include_adult=false&append_to_response=videos`;
        console.log(query);
        if(query.trim() === ''){
            setEmptyError(true);
            setMovies([]);
            return;
        }
        try{
            setError(false);
        const respose= await fetch(url);
        const data = await respose.json();
        console.log(data.results);
        setMovies(data.results);
        if(!data.results.length){
            setError(true);
        }
        }
        catch(err){
            console.error(err);
            setError(true);
        }
    }
    return(
    <div className="container">
     {
                  empty && 
                  <Alert  description=" Please enter a movie name" 
                  type="error" showIcon closable style={{color: `black`,fontWeight:'bolder',width:'100%',
                  margin:'15 rem',display: 'flex', flexDirection:'row',justifyContent:'center'}} />
                }


                {
                  error && 
                  <Alert  description=" No results, found. Please enter a valid movie name" 
                  type="error" showIcon closable style={{color: `black`,fontWeight:'bolder',width:'100%',
                  margin:'15 rem',display: 'flex', flexDirection:'row',justifyContent:'center'}} />
                }
                <form className="form" onSubmit={searchMovies} style={{color: 'black', margin:'2rem'}}>
                    <label className="label" htmlFor="query">            
                    </label>
                    <input  className="input" type="text" name="query" placeholder="Search movies..." value={query}
                        onChange={(e)=>setQuery(e.target.value)}/>
                        
                        <button className="button" type="submit" style={{color:'black',fontWeight:'bolder'}}>
                            Search
                        <FaSearch size={20}/>
                        </button>
                </form> 
                {          
                //<button className="button" type="submit">
                  //  <FaSearch size={20}/>
                //<IoSearchCircleSharp  size={50}/>
                //<i class="fa fa-search"></i>
               
               // </button>
                 }
           
            <div className="card-list">
                {
                //return only movies which has image i.e poster path
                }
            {movies.filter(movie=>movie.poster_path && movie.vote_average && movie.release_date).map(movie=>
                (<SearchMovieCard movie={movie} key={movie.id}/>)
            )}
            </div>
    </div>
    )
}
