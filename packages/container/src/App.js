import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Progress from "./components/Progress";
import NotFound from "./components/NotFound";
import { PrivateRoute } from "./routes/privateRoute";
import { PublicRoute } from "./routes/publicRoute";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import setAuthToken from "./utils/axios";
import { customApiRequest, loginRequest } from "./authConfig";
import { Profile } from "./components/Profile";

const MarketingPage = lazy(() => import("./components/apps/MarketingApp"));
const AuthPage = lazy(() => import("./components/apps/AuthApp"));
const DashboardPage = lazy(() => import("./components/apps/DashboardApp"));
const TablePage = lazy(() => import("./components/apps/DodgeTableApp"));

if (sessionStorage.token) {
  setAuthToken(sessionStorage.token);
}

export default () => {

  const isAuthenticated = useIsAuthenticated();
  const { instance, accounts } = useMsal();

   const acquireToken = async () => {
    const request = {
      ...customApiRequest,
      account: accounts[0],
    };

    // Silently acquires an access token which is then attached to a request for Microsoft Graph data
    try {
      const response = await instance
        .acquireTokenSilent(request);
      return response.accessToken;
    } catch (e) {
      instance.acquireTokenPopup(request).then((response_1) => response_1.accessToken);
    }
  }

  const onSignIn = () => {
    // if (loginType === "popup") {
    instance.loginRedirect(loginRequest).catch((e) => {
      console.log("check", e);
    });
    // } else if (loginType === "redirect") {
    //   instance.loginRedirect(loginRequest).catch((e) => {
    //     console.log(e);
    //   });
    // }
  };

  return (
    <>
      <div>
        <Suspense fallback={<Progress />}>
          <Switch>
            <PublicRoute
              path="/auth"
              component={AuthPage}
              onSignIn={onSignIn}
              isAuthenticated={isAuthenticated}
            />
            <PrivateRoute
              path="/dashboard"
              component={DashboardPage}
              role={1001}
              isAuthenticated={isAuthenticated}
              acquireToken={acquireToken}
            />
            <PrivateRoute
              path="/dodge"
              component={TablePage}
              token={"token"}
              isAuthenticated={isAuthenticated}
              acquireToken={acquireToken}
            />
            <PrivateRoute
              path="/profile"
              component={Profile}
              token={"token"}
              isAuthenticated={isAuthenticated}
              acquireToken={acquireToken}
            />
            <PrivateRoute
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
    </>
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
