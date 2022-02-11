import React from 'react'
import {Icon} from 'antd';
import { Button } from '@material-ui/core';
import {Link } from 'react-router-dom';
function Footer() {
    return (
        <div style={{
            height: '13%', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem',
            paddingTop: '20px' ,position: 'absolute',
            marginBottom: '0px',
            width: '100%'
        }}>

<Button style={{color:'black', backgroundColor: 'rgb(255, 203, 5)'}} alt="footerBtn" component={Link} to="/aboutUs">About Us</Button>
<br></br>
<small class="text-muted">COPYRIGHT &copy; 2021 MOVIEARENA 2021 LTD. ALL RIGHTS RESERVED</small>
       
        </div>
    )
}

export default Footer
