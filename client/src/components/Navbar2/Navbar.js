import React,{useEffect, useState} from 'react';
import {Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar,Typography,Toolbar,Avatar,Button } from '@material-ui/core';
import useStyles from './styles';
import {useDispatch} from 'react-redux';
import decode from 'jwt-decode';
const Navbar = () =>{
    const classes = useStyles();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    console.log(user);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const logout =()=>{
dispatch({type:'LOGOUT'});
history.push('/');
setUser(null);
    };
    useEffect(()=>{
        const token = user?.token;
       if(token){
           const decodedToken = decode(token);
           if(decodedToken.exp * 1000 < new Date().getTime()) logout();
       }
        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location]);
    return(
        // <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
                        {user && user.result ? (
<div className={classes.toolbar}>
    <Avatar className={classes.Avatar} alt={user.result.name} src={user.result.imageUrl} component={Link} to="/profile">{user.result.name.charAt(0)}</Avatar>
    <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
    <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>LOGOUT</Button>
</div>
                        ):(
<Button className={classes.sign} component={Link} to="/auth" variant="contained" color="warning">SIGNIN</Button>
                        )}
        </Toolbar>
    //   </AppBar>
    )
}

export default Navbar