import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
    const isAuth = useSelector((store) => store.auth.isAuth);

    if (isAuth) {
        return <Outlet />
    }

    return <Navigate to='/' />
};

export default PrivateRoutes;