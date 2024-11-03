import React, { useState, useEffect }  from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
//import { GoogleLogin } from 'react-google-login';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'; // Import the new Google OAuth components
import jwtDecode from 'jwt-decode';

import { useHistory } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';

import { signin, signup } from '../../../actions/auth';

import Icon from './icon';
import Input from './Input';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit = (e) => {
        //console.log(formData);
        e.preventDefault();
        
        if (isSignup) {
          // console.log('Heere');
          dispatch(signup(formData, history));
        } else {
          dispatch(signin(formData, history));
        }
    };

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const switchMode = () => {
        //setForm(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    const googleSuccess = async (credentialResponse) => {
        const token = credentialResponse.credential; // Get the JWT token
        const userObject = jwtDecode(token); // Decode the token to get user info
    
        try {
            dispatch({ type: 'AUTH', data: { result: userObject, token } });

            history.push('/');
            // Redirect or perform other actions here
        } catch (error) {
            //console.log("here in googleSuccErr");
            console.log(error);
        }
    };
    
    
    //const googleError = () => alert('Google Sign In was unsuccessful. Try again later');
    const googleError = (error) => {
        console.log(error);
        console.log('Google Sign In was unsuccessful. Try again later');
    };

    return (
        <Container component="main" maxWidth="xs">
          <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                { isSignup && (
                    <>
                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                        <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                    </>
                )}
                <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
              </Grid>
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                { isSignup ? 'Sign Up' : 'Sign In' }
              </Button>
              <div className={classes.googleButton}>
              <GoogleLogin 
                onSuccess={googleSuccess}
                onError={googleError}
              >
              </GoogleLogin>
              </div>
              <Grid container justifyContent="center" >
                <Grid item>
                    <Button onClick={switchMode} variant="contained" color="primary">
                        { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                    </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
  )
}

export default Auth;