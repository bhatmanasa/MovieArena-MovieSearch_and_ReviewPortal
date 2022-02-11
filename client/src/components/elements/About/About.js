import React from 'react'
import {Icon} from 'antd';
import { Typography,Container,Paper,Button,Grid } from '@material-ui/core';
import {Link } from 'react-router-dom';
function About() {
    return (

        <div style={{width:'100%', height: '350px', marginTop: '10%'}}>

    <Container component="main" maxWidth="sm" style={{backgroundColor: 'black', color: 'rgb(255, 203, 5)'}}>
        
        <Paper  elevator={3}>

            <Typography variant="h3" style={{backgroundColor: 'rgb(255, 203, 5)', color: 'black'}}>
                About Us
            </Typography>
            <form style={{height:'80%', margin: 'auto', backgroundColor: 'black', color: 'yellow'}}>
            <Grid>
            <p>
              This Application was created as a part of final project for Web Design And User Experience Engineering Graduate Course.

              </p>

            <Button type="submit" color="secondary" variant="contained" style={{marginRight:'1rem', width:'50%', backgroundColor:'rgb(255, 203, 5)',textTransform: 'capitalize', color: 'black'}} component={Link} to="/contact">
       Click here to provide any FeedBacks!
    </Button>
            </Grid>
            </form>
            </Paper>
    </Container>
</div>

)

}
export default About
