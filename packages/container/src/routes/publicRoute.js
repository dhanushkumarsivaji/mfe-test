import React from "react";
import { Route, Redirect } from "react-router-dom";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";

export const PublicRoute = (props) => {
  const {
    component: Component,
    children: Children,
    onSignIn,
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
            <Redirect
              to={{
                pathname: "/",
                state: { from: routeRenderProps.location },
              }}
            />
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            <Component {...routeRenderProps} onSignIn={onSignIn} />
          </UnauthenticatedTemplate>
        </>
      )}
    />
  );
};
