import React, { useContext } from "react";
import {
    Route,
    Redirect,
  } from "react-router-dom";
import AuthContext from '../context/auth/context';

  
  export const PublicRoute = props => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated } = authContext;
  
    const { component: Component, children: Children, onSignIn,  ...restProps  } = props;
  
    if (!Component) return null;
  
    return (
      <Route
        {...restProps}
        render={routeRenderProps =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
                state: { from: routeRenderProps.location }
              }}
            />
          ) : (
              <Component {...routeRenderProps} onSignIn={onSignIn}/> 
          )
        }
      />
    )
  }