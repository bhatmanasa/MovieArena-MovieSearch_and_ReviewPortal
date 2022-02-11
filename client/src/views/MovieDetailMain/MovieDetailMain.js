import React from 'react'
import { Typography,Row } from 'antd';

function MovieDetailMain(props){
    return(
        <div style={{
            background:
                `linear-gradient(to bottom, rgba(0,0,0,0)
                    39%,rgba(0,0,0,0)
                    41%,rgba(0,0,0,0.65)
                    100%), #1c1c1c`,
            height: '500px',
            backgroundSize: '100%, cover',
            backgroundPosition: 'center, center',
            width: '100%',
            position: 'relative'
        }}> 
        <iframe src={props.video}  allow="autoplay; encrypted-media" width="100%" height="500px" frameBorder="0" allowFullScreen/>      
          
    </div>
    )
}

export default MovieDetailMain;