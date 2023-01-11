import React, { useContext } from "react";
import {
    Route,
    Redirect,
  } from "react-router-dom";
import Layout from "../layout";
import AuthContext from '../context/auth/context';

  
  export const PrivateRoute = props => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, loading } = authContext;
  
    const { component: Component, children: Children, token,  ...restProps  } = props;
  
    if (!Component) return null;
  
    return (
      <Route
        exact
        {...restProps}
        render={routeRenderProps =>
          isAuthenticated ? (
            <Layout>
              <Component {...routeRenderProps} token={token}/> 
            </Layout>
          ) : (
            <Redirect
              to={{
                pathname: "/auth/signin",
                state: { from: routeRenderProps.location }
              }}
            />
          )
        }
      />
    )
  }