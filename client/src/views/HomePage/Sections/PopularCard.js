import React from 'react'
import {Col} from 'antd'

function PopularCard(props){
return(
    //each card is of size 24
    <Col lg={6} md={8} xs={24}>
        <div style={{postion:'relative'}}>
            <a href={`/movie/${props.movieId}`}>
                <img style={{width:'100%',height:'320px'}} alt="image" src={props.image}/>
            </a>
            </div>
    </Col>
)
}

export default PopularCard;