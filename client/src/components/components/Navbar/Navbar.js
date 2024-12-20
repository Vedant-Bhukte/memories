import React, { useState, useEffect } from 'react'
import { AppBar, Typography, Toolbar, Avatar, Button} from '@material-ui/core';
// import memories from '../../../images/memories.png';
// import memoriesLogo from '../../../images/memories-Logo.png';
// import memoriesText from '../../../images/memories-Text.png';
import * as actionType from '../../../constants/actionTypes';
import decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import useStyles from './styles';

import { Link, useHistory, useLocation } from 'react-router-dom';

const Navbar = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    //console.log(user);

    const logout = () => {
      dispatch({ type: actionType.LOGOUT });
  
      history.push('/auth');
  
      setUser(null);
    };

    useEffect(() => {
        const token = user?.token;
    
        if (token) {
          const decodedToken = decode(token);
    
          if (decodedToken.exp * 1000 < new Date().getTime()) {
            logout();
          }
        }
    
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
          <Typography 
            component={Link} 
            to="/" 
            variant="h4" 
            className={classes.brandText}
          >
            Memories
          </Typography>
        </div>
        <Toolbar className={classes.toolbar}>
            {user ? (
              <div className={classes.profile}>
                {/* <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar> */}
                <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
              </div>
            ) : (
              <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
            )}
        </Toolbar>
    </AppBar>
  )
}

export default Navbar
