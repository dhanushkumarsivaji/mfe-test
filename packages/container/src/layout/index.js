import React, { lazy } from 'react';
const MarketingLazy = lazy(() => import('../components/MarketingApp'));
const SidebarLazy = lazy(() => import('../components/SidebarApp'));

const Layout = () => {
    return (
        <>
            <SidebarLazy/>
            <MarketingLazy/>
        </>
    )
}

export default Layout;