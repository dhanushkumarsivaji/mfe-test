import React, { lazy, Suspense, useState, useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import Progress from "./components/Progress";
import Header from "./components/Header";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./components/NotFound";
import { PrivateRoute } from "./routes/privateRoute";
import { AdminRoute } from "./routes/adminRoute";


const MarketingPage = lazy(() => import("./components/apps/MarketingApp"));
const AuthPage = lazy(() => import("./components/apps/AuthApp"));
const DashboardPage = lazy(() => import("./components/apps/DashboardApp"));
const TablePage = lazy(() => import("./components/apps/DodgeTableApp"));


const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const token = {
    accessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    refreshToken:
      "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ",
  };

  useEffect(() => {
    if (isSignedIn) {
      history.push("/dashboard");
    }
  }, [isSignedIn]);

  return (
    <ErrorBoundary>
      <Router history={history}>
          <div>
            <Header
              onSignOut={() => setIsSignedIn(false)}
              isSignedIn={isSignedIn}
            />
            <Suspense fallback={<Progress />}>
              <Switch>
                <Route path="/auth">
                  <AuthPage onSignIn={() => setIsSignedIn(true)} />
                </Route>
                <AdminRoute path="/dashboard" component={DashboardPage} role={1001} />
                <PrivateRoute
                  path="/dodge"
                  component={TablePage}
                  token={token}
                />
                <PrivateRoute path="/" component={MarketingPage} />
                <Route path="*" component={NotFound} />
              </Switch>
            </Suspense>
          </div>
      </Router>
    </ErrorBoundary>
  );
};

{
  /* <Route path="/dashboard">
                  {!isSignedIn && <Redirect to="/" />}
                  <DashboardPage />
  </Route> */
}
