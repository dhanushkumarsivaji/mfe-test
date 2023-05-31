import React, { lazy, Suspense } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Route, Switch } from "react-router-dom";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import theme from "./styles/themes";
import { ErrorBoundary } from "react-error-boundary";
import Favicon from "react-favicon";
import { MittProvider } from "react-mitt"
import "devextreme/dist/css/dx.light.css";

import Progress from "./components/Progress";
import NotFound from "./components/NotFound";
import ErrorBoundaryComponent from "./components/ErrorBoundary";

import { PrivateRoute } from "./routes/privateRoute";
import { PublicRoute } from "./routes/publicRoute";

import { customApiRequest, loginRequest } from "./authConfig";
import LayoutDesign from "./layout/figma";

const AuthPage = lazy(() => import("./components/apps/AuthApp"));
const MarketingPage = lazy(() => import("./layout/home"));
const ProfilePage = lazy(() => import("./layout/profile"));
const DashboardPage = lazy(() => import("./layout/dashboard"));
const AccountsPage = lazy(() => import("./layout/accounts"));
const SecuritiesPage = lazy(() => import("./layout/securities"));
import "./index.css";

export default () => {
  const isAuthenticated = useIsAuthenticated();
  const { instance, accounts } = useMsal();

  const acquireToken = async () => {
    const request = {
      ...customApiRequest,
      account: accounts[0],
    };

    // Silently acquires an access token which is then attached to a request for API Invocation
    try {
      const response = await instance.acquireTokenSilent(request);
      return response.accessToken;
    } catch (e) {
      instance
        .acquireTokenPopup(request)
        .then((response_1) => response_1.accessToken);
    }
  };

  const onSignIn = () => {
    instance.loginRedirect(loginRequest).catch((e) => {
      console.log("check", e);
    });
  };

  return (
    <MittProvider>
    <ThemeProvider theme={theme}>
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryComponent}
        onReset={() => {}}
      >
        <Favicon url="https://www.dodgeandcox.com/etc.clientlibs/dodgeandcox/clientlibs/clientlib-site/resources/images/favicon.ico" />
        <div>
          <Suspense fallback={<Progress />}>
            <Switch>
              <PublicRoute
                path="/auth"
                component={LayoutDesign}
                onSignIn={onSignIn}
                isAuthenticated={isAuthenticated}
              />
              <PublicRoute
                path="/figma"
                component={LayoutDesign}
                onSignIn={onSignIn}
                isAuthenticated={isAuthenticated}
              />
              <PublicRoute
                path="/dashboard"
                component={DashboardPage}
                role={1001}
                isAuthenticated={isAuthenticated}
                acquireToken={acquireToken}
              />
              <PrivateRoute
                path="/accounts"
                component={AccountsPage}
                token={"token"}
                isAuthenticated={isAuthenticated}
                acquireToken={acquireToken}
              />
              <PrivateRoute
                path="/securities"
                component={SecuritiesPage}
                token={"token"}
                isAuthenticated={isAuthenticated}
                acquireToken={acquireToken}
              />
              <PrivateRoute
                path="/profile"
                component={ProfilePage}
                token={"token"}
                isAuthenticated={isAuthenticated}
                acquireToken={acquireToken}
              />
              <PublicRoute
                path="/"
                component={MarketingPage}
                token={"token"}
                isAuthenticated={isAuthenticated}
                acquireToken={acquireToken}
              />
              <Route path={"*"} component={NotFound} />
            </Switch>
          </Suspense>
        </div>
      </ErrorBoundary>
    </ThemeProvider>
    </MittProvider>
  );
};

{
  /* <Route path="/dashboard">
                  {!isSignedIn && <Redirect to="/" />}
                  <DashboardPage />
  </Route> */
}

// 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

// {
//   "clientId": "feacbad9-0350-4b82-8642-a1a9e6abccaa",
//   "clientSecret": "lF48Q~Wdg2eBEadl1o2h-2XU8PiQ3N9Yu_Ihddre",
//   "subscriptionId": "351b6525-81b1-48bf-a6e8-4bd5da72e974",
//   "tenantId": "39de4c31-5af6-43b4-8418-bb6a45179340",
//   "activeDirectoryEndpointUrl": "https://login.microsoftonline.com",
//   "resourceManagerEndpointUrl": "https://management.azure.com/",
//   "activeDirectoryGraphResourceId": "https://graph.windows.net/",
//   "sqlManagementEndpointUrl": "https://management.core.windows.net:8443/",
//   "galleryEndpointUrl": "https://gallery.azure.com/",
//   "managementEndpointUrl": "https://management.core.windows.net/"
// }

//AKIASNSUKHU2U3PVIPHT
//B4xq8UDNwN/9vjTP9hy/EGS1vRliqLWfsFgMVDGc
//
