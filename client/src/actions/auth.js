import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, history) => async (dispatch) => {
    try {
      //console.log("HERE in actions . auth");
      const { data } = await api.signIn(formData);
  
      dispatch({ type: 'AUTH', data });
  
      history.push('/');
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 404) {
          alert(data.message); // Alert for user not found
        } else if (status === 400) {
          alert(data.message); // Alert for invalid credentials
        } else if (status === 500) {
          alert("Server error: Something went wrong. Please try again later.");
        }
      } else {
        alert("Network error: Unable to reach the server.");
      }
      console.log(error);
    }
  };
  
export const signup = (formData, history) => async (dispatch) => {
    try {
       const { data } = await api.signUp(formData);
  
       dispatch({ type: 'AUTH', data });
  
      history.push('/');
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          alert(data.message); // Alert- user already exist / wrong password
        } else if (status === 500) {
          alert("Server error: Something went wrong. Please try again later.");
        }
      } else {
        alert("Network error: Unable to reach the server.");
      }
      console.log(error);
    }
  };