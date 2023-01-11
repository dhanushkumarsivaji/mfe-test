import React, { lazy, Suspense, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import Progress from "./components/Progress";
import Header from "./components/Header";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./components/NotFound";
import { PrivateRoute } from "./routes/privateRoute";
import { PublicRoute } from "./routes/publicRoute";
import { AdminRoute } from "./routes/adminRoute";
import AuthContext from './context/auth/context';
import setAuthToken from "./utils/axios";

const MarketingPage = lazy(() => import("./components/apps/MarketingApp"));
const AuthPage = lazy(() => import("./components/apps/AuthApp"));
const DashboardPage = lazy(() => import("./components/apps/DashboardApp"));
const TablePage = lazy(() => import("./components/apps/DodgeTableApp"));

if (sessionStorage.token) {
  setAuthToken(sessionStorage.token);
}


export default () => {


  const authContext = useContext(AuthContext);

  const { login, isAuthenticated, logout } = authContext;

  const token = {
    accessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    refreshToken:
      "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ",
  };

  // useEffect(() => {
    // if (isAuthenticated) {
    //   history.push("/");
    // }
  // }, [isAuthenticated]);

  const onSignIn = (data) => {
    login(data);
  };

  return (
    <ErrorBoundary>
      <div>
        <Header
          onSignOut={() => logout()}
          isSignedIn={isAuthenticated}
        />
        <Suspense fallback={<Progress />}>
          <Switch>
            <PublicRoute path="/auth" component={AuthPage} onSignIn={onSignIn} />
            <AdminRoute
              path="/dashboard"
              component={DashboardPage}
              role={1001}
            />
            <PrivateRoute path="/dodge" component={TablePage} token={token} />
            <PrivateRoute path="/" component={MarketingPage} token={token}/>
            <PrivateRoute path={"*"} component={NotFound} />
          </Switch>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};

{
  /* <Route path="/dashboard">
                  {!isSignedIn && <Redirect to="/" />}
                  <DashboardPage />
  </Route> */
}
