import React, { lazy } from 'react';
const MarketingLazy = lazy(() => import('./MarketingApp'));
const SidebarLazy = lazy(() => import('./SidebarApp'));

const Test = () => {
    return (
        <>
            <SidebarLazy/>
            <MarketingLazy/>
        </>
    )
}

export default Test;