import React from 'react';

import {Navigate, Outlet} from 'react-router-dom';
import {routes} from '../../../routes/routes';
import useAuth from '../hooks/useAuth';
import Spinner from '../Spinner';

const PublicRoute = () => {
    const {access_token, profileLoading} = useAuth();

    if (profileLoading) {
        return <Spinner />;
    }

    return access_token ? <Navigate to={routes.home}/> : <Outlet/>;
};

export default PublicRoute;
