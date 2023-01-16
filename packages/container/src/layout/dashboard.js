import React, { lazy } from "react";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useHistory } from "react-router-dom";
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryComponent from "../components/ErrorBoundary";
import Header from "../components/Header";

const Sidebar = lazy(() => import("../components/apps/SidebarApp"));
const Dashboard = lazy(() => import("../components/apps/DashboardApp"));

const DashboardPage = ({ ...rest }) => {

  const history = useHistory()
  const isAuthenticated = useIsAuthenticated();
  const { instance } = useMsal();

  const handleLogout = async () => {
    await instance.logoutPopup({
      postLogoutRedirectUri: "/",
      mainWindowRedirectUri: "/",
    });
    sessionStorage.clear()
    history.push('/auth/signin')

  };

  return (
    <div>
    <Header onSignOut={handleLogout} isSignedIn={isAuthenticated} />
    <div style={{ display: "flex", flex: 1 }}>
      <div style={{ width: "240px" }}>
        <ErrorBoundary FallbackComponent={ErrorBoundaryComponent} onReset={() => { }}>
          <Sidebar />
        </ErrorBoundary>
      </div>
      <div style={{ flex: "1", margin: "30px" }}>
        <ErrorBoundary FallbackComponent={ErrorBoundaryComponent} onReset={() => { }}><Dashboard { ...rest }/></ErrorBoundary>
      </div>
    </div>
    </div>
  );
};

export default DashboardPage;
