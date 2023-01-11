import React, { useContext } from "react";
import {
    Route,
    Redirect,
  } from "react-router-dom";
import Layout from "../layout";
import AuthContext from '../context/auth/context';


 const ALLOWD_ROLES = [1001,1002]
  
  export const AdminRoute = props => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, loading } = authContext;
  
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