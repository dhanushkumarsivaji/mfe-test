import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './context';
import authReducer from './reducer';
import setAuthToken from '../../utils/axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';

const AuthState = props => {
  const initialState = {
    token: sessionStorage.getItem('token'),
    isAuthenticated: sessionStorage.getItem('isAuthenticated'),
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    if (sessionStorage.token) {
      setAuthToken(sessionStorage.token);
    }

    try {
      const res = await axios.get('http://localhost:5000/api/auth');

      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };


  // Login User
  const login = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('http://localhost:5000/api/auth', formData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      // loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };


  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({type:CLEAR_ERRORS})


    // Register User
    const register = async formData => {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
  
      try {
        const res = await axios.post('http://localhost:5000/api/users', formData, config);
  
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data
        });
          loadUser()
      
      } catch (err) {
        dispatch({
          type: REGISTER_FAIL,
          payload: err.response.data.msg
        });
      }
    };


  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        clearErrors,
        loadUser,
        login,
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;