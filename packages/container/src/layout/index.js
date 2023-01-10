import React, { lazy } from "react";
const Marketing = lazy(() => import("../components/MarketingApp"));
const Sidebar = lazy(() => import("../components/SidebarApp"));
import ErrorBoundary from "../components/ErrorBoundary";

const Layout = () => {
  return (
    <ErrorBoundary>
    <div style={{display:'flex', flex: 1}}>
        <div style={{width:'240px'}}>
            <Sidebar />
        </div>
        <div style={{flex:'1', margin: '30px'}}>
            <Marketing />
        </div>
    </div>
  </ErrorBoundary>
  );
};

export default Layout;
