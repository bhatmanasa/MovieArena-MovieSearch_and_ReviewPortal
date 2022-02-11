import React,{useState} from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core' ;
import {GoogleLogin} from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
 import userStyles  from './styles';
import Input from './input';
import Icon from './icon';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {signin,signup} from '../../actions/auth';
import { validEmail, validPassword, validName } from './Regex';
import { Alert } from 'antd';
const initialState = {firstName: '',lastName: '', email : '' , password: '', confirmPassword: ''}; 
const Auth =()=>{
const [errors, setErrors] = useState({
        emptyEmail: false,
        inValidEmail: false,
        emptyPassword: false,
        inValidPassword: false,
        emptyRePassword: false,
        inValidRePassword: false,
        emptyFirstName: false,
        inValidFirstName: false,
        emptyLastName: false,
        inValidLastName: false,
    });
const classes = userStyles();
const [showPassword, setShowPassword] = useState(false);
const [isSignup,setIsSignup] = useState(false);
const [formData,setFormData] = useState(initialState);
const dispatch = useDispatch();
const history = useHistory();
const [submitted, setSubmitted] = useState(false);
const [auth,setAuth] = useState(false);
const [msg,setMsg] = useState('');
const [errorSet,setErrorSet] = useState(false);

const handleSubmit = (e)=>{
     setFormData({ ...formData,[e.target.name]:e.target.value});
            errors.emptyEmail = false;
        errors.inValidEmail = false;
        errors.emptyPassword = false;
        errors.inValidPassword = false;
        errors.emptyRePassword = false;
        errors.inValidRePassword = false;
        errors.emptyFirstName = false;
        errors.inValidFirstName = false;
        errors.emptyLastName = false;
        errors.inValidLastName = false;
        errors.differentPass = false;
    e.preventDefault();
    setSubmitted(true);
        let formIsValid = true;
    if(isSignup){
        e.preventDefault();

        //Validate first name, lastname, password ,confirm passwrd and email inputs
        if (!formData.email){
            formIsValid = false;
            errors.emptyEmail = true;
        }
        if (!formData.password){
            formIsValid = false;
            errors.emptyPassword = true;
        }
        if (!formData.confirmPassword){
            formIsValid = false;
            errors.emptyRePassword = true;
        }
        if (!formData.firstName){
            formIsValid = false;
            errors.emptyFirstName = true;
        }
        if (!formData.lastName){
            formIsValid = false;
            errors.emptyLastName = true;
        }
      if (!validEmail.test(formData.email)) {
         errors.inValidEmail = true;
         formIsValid = false;
      }
      if (!validPassword.test(formData.password)) {
         errors.inValidPassword = true;
         formIsValid = false;
      }
      if (!validPassword.test(formData.confirmPassword)) {
        errors.inValidRePassword = true;
        formIsValid = false;
     }
      if (!validName.test(formData.firstName)) {
         errors.inValidFirstName = true;
         formIsValid = false;
      }
      if (!validName.test(formData.lastName)) {
         errors.inValidLastName = true;
         formIsValid = false;
      }
 
        if(formIsValid){
            if(formData.confirmPassword !== (formData.password)){
                errors.differentPass = true;
                formIsValid = false;
            }else{
            dispatch(signup(formData,history)).then(function (response) {
                setAuth(true)
                history.push('/');
            })
            .catch(function (error) {
                if(error.response.data.message){
                    setAuth(false);
                    setErrorSet(true);       
                    setMsg(error.response.data.message);
                }else{
                    if(error.response){ 
                        setAuth(false);
                        setErrorSet(true);       
                        setMsg(error.response.data.message);
                       
                      }else{
                        setAuth(true)
                          history.push('/');
                      }
                }

      
            });
          }
        }
    }else{
                //Validate email and password inputs
        if (!formData.email){
            formIsValid = false;
            errors.emptyEmail = true;
        }
        if (!formData.password){
            formIsValid = false;
            errors.emptyPassword = true;
        }
       
      if (!validEmail.test(formData.email)) {
         errors.inValidEmail = true;
         formIsValid = false;
      }

      if (!validPassword.test(formData.password)) {
         errors.inValidPassword = true;
         formIsValid = false;
      }
      if(formIsValid){
      dispatch(signin(formData,history)).then(function (response) {
        setAuth(true)
      })
      .catch(function (error) {
    if(error.response){ 
        setAuth(false);
        setErrorSet(true);
        setMsg(error.response.data.message);
    }else{
        setAuth(true)
        history.push('/');
    }

      });
      }
    }
};
const handleChange = (e)=>{

    setFormData({ ...formData,[e.target.name]:e.target.value});
};
const switchMode = ()=>{
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
};
const googleSuccess =  async (res)=>{
    const result = res?.profileObj; //? will make sure no error if res is undefined
    const token = res?.tokenId;
    try{
        dispatch({type:'AUTH', data: {result,token}});
        history.push('/');
    }catch(error){
        console.log(error);
    }
};
const googleFailure = (error)=>{
    console.log(error);
    console.log("Google sign in unsuccessfull! Try again later!")
};
const handleShowPassword = () => setShowPassword((prevShowPassword)=> !prevShowPassword);

return(
 
<div className='authForm'>
    <Container component="main" maxWidth="sm">
        
        <Paper className={classes.paper} elevator={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h3">
                {isSignup ? 'Sign Up': 'Sign In'}
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                    isSignup && (<>
                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus className={classes.input} />
                     {submitted && errors.emptyFirstName && <Alert  description='First Name is Mandatory!'
                    type="error" showIcon closable style={{color: `black`,fontWeight:'bolder',width:'100%',
                    margin:'15 rem',display: 'flex', flexDirection:'row',justifyContent:'center'}} />}
                     {submitted && !errors.emptyFirstName && errors.inValidFirstName &&  <Alert  description='First Name is invalid! Please enter only characters (Alphabets)'
                    type="error" showIcon closable style={{color: `black`,fontWeight:'bolder',width:'100%',
                    margin:'15 rem',display: 'flex', flexDirection:'row',justifyContent:'center'}} />}
                        <Input name="lastName" label="Last Name" handleChange={handleChange} className={classes.input} />
                        {submitted && errors.emptyLastName && <Alert  description='Last Name is Mandatory!'
                    type="error" showIcon closable style={{color: `black`,fontWeight:'bolder',width:'100%',
                    margin:'15 rem',display: 'flex', flexDirection:'row',justifyContent:'center'}} />}
                        {submitted && !errors.emptyLastName && errors.inValidLastName && <Alert  description='Last Name is invalid! Please enter only characters (Alphabets)'
                    type="error" showIcon closable style={{color: `black`,fontWeight:'bolder',width:'100%',
                    margin:'15 rem',display: 'flex', flexDirection:'row',justifyContent:'center'}} />}
                        </>
                    )
                    }
                    <Input name="email" label="Email Address" handleChange={handleChange} className={classes.input} />
                    {submitted && errors.emptyEmail && <Alert  description='Email is Mandatory!'
                    type="error" showIcon closable style={{color: `black`,fontWeight:'bolder',width:'100%',
                    margin:'15 rem',display: 'flex', flexDirection:'row',justifyContent:'center'}} />}
                    {submitted && !errors.emptyEmail && errors.inValidEmail && <Alert  description='Email is invalid! Please enter valid format (****@***.***)'
                    type="error" showIcon closable style={{color: `black`,fontWeight:'bolder',width:'100%',
                    margin:'15 rem',display: 'flex', flexDirection:'row',justifyContent:'center'}} />}
                    <Input name="password" label="password" handleChange={handleChange} type={showPassword ? "Text":"Password"} handleShowPassword={handleShowPassword} className={classes.input}/>
                    {submitted && errors.emptyPassword && <Alert  description='Password is Mandatory!'
                    type="error" showIcon closable style={{color: `black`,fontWeight:'bolder',width:'100%',
                    margin:'15 rem',display: 'flex', flexDirection:'row',justifyContent:'center'}} />}
                    {submitted && !errors.emptyPassword && errors.inValidPassword && <Alert  
                    description='Password is invalid! Password needs to be atleast 6 characters with atleast one Uppercase, one Lowercase, One number and One special character'
                    type="error" showIcon closable style={{color: `black`,fontWeight:'bolder',width:'100%',
                    margin:'15 rem',display: 'flex', flexDirection:'row',justifyContent:'center'}} />
              }
                    {/* {isSignup && (<><Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"  />
                    {submitted && errors.emptyRePassword && <div className="mandate-feedback">Confirm Password is Mandatory!</div>})} */}

                                        {
                    isSignup && (<>
                    <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type='password' className={classes.input}/>
                     {submitted && errors.emptyRePassword && <Alert  description='Confirm Password is Mandatory!'
                    type="error" showIcon closable style={{color: `black`,fontWeight:'bolder',width:'100%',
                    margin:'15 rem',display: 'flex', flexDirection:'row',justifyContent:'center'}} />
              }
                     {submitted && !errors.emptyRePassword && errors.inValidRePassword && <Alert  description='Confirm Password is invalid!'
                    type="error" showIcon closable style={{color: `black`,fontWeight:'bolder',width:'100%',
                    margin:'15 rem',display: 'flex', flexDirection:'row',justifyContent:'center'}} />
              }

{submitted && !errors.emptyRePassword && !errors.inValidRePassword && errors.differentPass && <Alert  description='Confirm Password needs to match Password!'
                    type="error" showIcon closable style={{color: `black`,fontWeight:'bolder',width:'100%',
                    margin:'15 rem',display: 'flex', flexDirection:'row',justifyContent:'center'}} />
              }

    
                        </>
                    )
                    } 
                     {submitted && !auth && errorSet && <Alert  description={msg}
                    type="error" showIcon closable style={{color: `black`,fontWeight:'bolder',width:'100%',
                    margin:'15 rem',display: 'flex', flexDirection:'row',justifyContent:'center'}} />
              }
                </Grid>
                <Button type="submit" fullWidth variant="contained" style={{
        backgroundColor: "rgb(0, 28, 32)", color: "white" , marginTop : "50px"
    }} className="classes.submit">
                    {isSignup?'Sign Up': 'Sign In'}
                </Button>
                <GoogleLogin
                    clientId = "50078843138-2bt0quue0jm4f8eab43fdmscj9p3ubmo.apps.googleusercontent.com"
                    render={(renderProps)=>(
                        <Button className={classes.googleButton} style={{
                            backgroundColor: "rgb(0, 28, 32)", color: "white", marginTop : "20px"
                        }} fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                            Google Sign In
                        </Button>
                    )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy="single_host_origin"
                />
                <Grid container justify="flex-end">
                    <Grid item>
                        <Button onClick={switchMode}  style={{
                            fontSize : "12px", fontStyle : "italic"
                        }}>
                            {isSignup ? 'Already have an account? Sign In':'Dont have an Account? Sign Up!'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
</div>
)
}


export default Auth;