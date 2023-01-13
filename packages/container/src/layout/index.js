import React, { lazy } from "react";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
const Sidebar = lazy(() => import("../components/apps/SidebarApp"));
import ErrorBoundary from "../components/ErrorBoundary";
import Header from "../components/Header";

const Layout = ({ children }) => {

  const isAuthenticated = useIsAuthenticated();
  const { instance } = useMsal();

  const handleLogout = async () => {
    await instance.logoutPopup({
      postLogoutRedirectUri: "/",
      mainWindowRedirectUri: "/",
    });
  };

  return (
    <div>
    <Header onSignOut={handleLogout} isSignedIn={isAuthenticated} />
    <div style={{ display: "flex", flex: 1 }}>
      <div style={{ width: "240px" }}>
        <ErrorBoundary>
          <Sidebar />
        </ErrorBoundary>
      </div>
      <div style={{ flex: "1", margin: "30px" }}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </div>
    </div>
    </div>
  );
};

export default Layout;
