import React from "react";
import { Route, Redirect } from "react-router-dom";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import Layout from "../layout";

export const PrivateRoute = (props) => {
  const {
    component: Component,
    children: Children,
    token,
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
            <Layout>
              <Component {...routeRenderProps} token={token} />
            </Layout>
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
