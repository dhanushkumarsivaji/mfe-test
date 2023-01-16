import React from "react";
import { Route, Redirect } from "react-router-dom";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";

export const PrivateRoute = (props) => {
  const {
    component: Component,
    children: Children,
    token,
    acquireToken,
    ...restProps
  } = props;


  if (!Component) return null;

  return (
    <Route
      exact
      {...restProps}
      render={(routeRenderProps) => (
        <>
          <AuthenticatedTemplate>
              <Component {...routeRenderProps} token={token} acquireToken={acquireToken} />
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            <Redirect
              to={{
                pathname: "/auth/signin",
                state: { from: routeRenderProps.location },
              }}
            />
          </UnauthenticatedTemplate>
        </>
      )}
    />
  );
};
