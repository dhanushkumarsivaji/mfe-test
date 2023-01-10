import React, { lazy } from "react";
const Sidebar = lazy(() => import("../components/apps/SidebarApp"));
import ErrorBoundary from "../components/ErrorBoundary";

const Layout = ({ children }) => {
  return (
    <ErrorBoundary>
    <div style={{display:'flex', flex: 1}}>
        <div style={{width:'240px'}}>
            <Sidebar />
        </div>
        <div style={{flex:'1', margin: '30px'}}>
            {children}
        </div>
    </div>
  </ErrorBoundary>
  );
};

export default Layout;
