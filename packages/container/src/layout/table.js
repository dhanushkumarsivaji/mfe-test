import React, { lazy } from "react";
import { styled } from '@mui/material/styles';
const DodgeTable = lazy(() => import("../components/DodgeTable"));
const SideBar = lazy(() => import("../components/SidebarApp"));
import ErrorBoundary from "../components/ErrorBoundary";


const Layout = () => {
  return (
    <>
      <ErrorBoundary>
        <div style={{display:'flex', flex: 1}}>
            <div style={{width:'240px'}}>
                <SideBar />
            </div>
            <div style={{flex:'1', margin: '30px'}}>
                <DodgeTable />
            </div>
        </div>
      </ErrorBoundary>
    </>
  );
};

export default Layout;
