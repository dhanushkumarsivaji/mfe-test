import React from "react";
import {
    Route,
    Redirect,
  } from "react-router-dom";
import Layout from "../layout";

  
  export const PrivateRoute = props => {
    const isAuthenticated = true
  
    const { component: Component, children: Children, token,  ...restProps  } = props;
  
    if (!Component) return null;
  
    return (
      <Route
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