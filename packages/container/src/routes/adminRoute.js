import React from "react";
import {
    Route,
    Redirect,
  } from "react-router-dom";
import Layout from "../layout";


 const ALLOWD_ROLES = [1001,1002]
  
  export const AdminRoute = props => {
    const isAuthenticated = true
  
    const { component: Component, children: Children, token, role,   ...restProps  } = props;
  
    if (!Component) return null;
  
    return (
      <Route
        {...restProps}
        render={routeRenderProps =>
          isAuthenticated && ALLOWD_ROLES.includes(role) ? (
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