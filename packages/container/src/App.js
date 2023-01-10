import React, { lazy, Suspense, useState, useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import { createBrowserHistory } from "history";

import Progress from "./components/Progress";
import Header from "./components/Header";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./components/NotFound";

const HomePage = lazy(() => import("./layout"));
const AuthPage = lazy(() => import("./components/AuthApp"));
const DashboardPage = lazy(() => import("./components/DashboardApp"));
const TablePage = lazy(() => import("./layout/table"));
// const TestLazy = lazy(() => import('./components/AuthApp'))
// const SidebarApp = lazy(() => import('./components/SidebarApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

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
        <StylesProvider generateClassName={generateClassName}>
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
                <Route path="/dodge">
                  <TablePage token={token} />
                </Route>
                <Route path="/dashboard">
                  {!isSignedIn && <Redirect to="/" />}
                  <DashboardPage />
                </Route>
                <Route path="/" component={HomePage} />
                <Route path={"*"} component={NotFound} />
              </Switch>
            </Suspense>
          </div>
        </StylesProvider>
      </Router>
    </ErrorBoundary>
  );
};
