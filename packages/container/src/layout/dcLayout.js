import React, { lazy } from 'react';
const DCTable = lazy(() => import('../components/DodgeTable'));
const SidebarLazy = lazy(() => import('../components/SidebarApp'));

const Layout = () => {
    return (
        <>
            <SidebarLazy/>
            <DCTable/>
        </>
    )
}

export default Layout;