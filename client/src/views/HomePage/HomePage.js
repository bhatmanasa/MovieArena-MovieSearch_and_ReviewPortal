import React, { useEffect, useState } from 'react'
import './HomePage.css' 
// import { FaCode } from "react-icons/fa";
import {API_KEY, API_URL, IMAGE_URL} from '../../config';
import PopularCard from './Sections/PopularCard';
import PopularMain from './Sections/PopularMain';
import { Typography,Row,Carousel,Button } from 'antd';
const { Title } = Typography;


function LandingPage() {
    //const [state,setState] = useState(initialState);
    const [popMovies,setPopMovies]=useState([]);
    const [currentPage,setCurrentPage] = useState(0);
    useEffect(()=>{
    const endpointUrl = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    fetchMovies(endpointUrl)
    },[])

const fetchMovies=(path)=>{   
    fetch(path)
      .then(response=>response.json())
      .then(response=>{
          console.log(response);
          setPopMovies([...popMovies,...response.results]);//first page results are getting overrided 
          //with second page details when View More is clicked so use spread operator
          //or concat()
          //spread operator allows an iterable such as an array expression or 
          //string to be expanded in places where zero or more arguments 
          setCurrentPage(response.page);
      })
}

const handleClick=()=>{
    const endpointUrl = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage+1}`
    fetchMovies(endpointUrl)
}
/*
const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };*/

    return (
    <div style={{width:'100%', margin:0}}>
        {/*Popular movies heading image */}
        <Carousel autoplay>
            <div>
            <h3 >
            {popMovies[0]&&
                
                <PopularMain image={`${IMAGE_URL}w1280${popMovies[0].backdrop_path && popMovies[0].backdrop_path}`} 
                    title={popMovies[0].title} text={popMovies[0].overview} />
                }  
            </h3>
            </div>
            <div>
            <h3 >
            {popMovies[1]&&
                
                <PopularMain image={`${IMAGE_URL}w1280${popMovies[1].backdrop_path && popMovies[1].backdrop_path}`} 
                    title={popMovies[1].title} text={popMovies[1].overview} />
                }  
            </h3>
            </div>
            <div>
            <h3 >
            {popMovies[2]&&
                
                <PopularMain image={`${IMAGE_URL}w1280${popMovies[2].backdrop_path && popMovies[2].backdrop_path}`} 
                    title={popMovies[2].title} text={popMovies[2].overview} />
                }  
            </h3>
            </div>
            <div>
            <h3 >
            {popMovies[3]&&             
                <PopularMain image={`${IMAGE_URL}w1280${popMovies[3].backdrop_path && popMovies[3].backdrop_path}`} 
                    title={popMovies[3].title} text={popMovies[3].overview} />
                }  
            </h3>
            </div>
  </Carousel>
{
/*
        {popMovies[0]&&
        //since the time to load backdrop_path is more than loading entire component
        //we need to specify popMovies[0]&&<PopularMain/>
        //otherwise just <PopularMain/> is fine
        <PopularMain image={`${IMAGE_URL}w1280${popMovies[0].backdrop_path && popMovies[0].backdrop_path}`} 
            title={popMovies[0].title} text={popMovies[0].overview} />
        }  

        {//Popular images body
        //gutter property of Row is used for grid spacing
        //array can be used for horizontal and vertical spacing
        //[horizontal,vertical]
        }

*/}
        <div style={{ width: '85%', margin: '1rem auto' }}>
            <Title level={2} style={{color:'white'}}> Popular Movies </Title>
            <hr />
            <Row gutter={[16, 16]}>
                {popMovies && popMovies.map((popMovie,index)=>
                    (
                          <React.Fragment key={index}>
                              <PopularCard image={popMovie.poster_path && `${IMAGE_URL}w500${popMovie.poster_path}`}
                              movieId={popMovie.id}/>
                            </React.Fragment>  
                    )
                )}
            </Row>

           {/*View More */}
            <br />
            <br/>
            <br/>
            <br/>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="link" className="viewMore" onClick={handleClick} style={{color:'white', fontWeight:'bolder'}}>VIEW MORE</Button>          
        </div>
    </div>
    </div>
    )
}

export default LandingPage
