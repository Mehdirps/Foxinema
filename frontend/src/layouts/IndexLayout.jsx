import React from 'react';
import { Outlet } from 'react-router-dom';

const IndexLayout = () => {
    return (
        <>
            <Outlet />
        </>

    );
};

export default IndexLayout;