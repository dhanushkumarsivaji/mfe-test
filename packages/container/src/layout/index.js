import React, { lazy } from "react";
const Sidebar = lazy(() => import("../components/apps/SidebarApp"));
import ErrorBoundary from "../components/ErrorBoundary";

const Layout = ({ children }) => {
  return (
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
  );
};

export default Layout;
