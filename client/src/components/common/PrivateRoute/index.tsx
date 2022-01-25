import React from 'react';

import {Navigate, Outlet} from 'react-router-dom';
import {routes} from '../../../routes/routes';
import useAuth from '../hooks/useAuth';

import Spinner from '../Spinner';

const PrivateRoute = () => {
    const {access_token, profileLoading} = useAuth();

    if (profileLoading) {
        return <Spinner />;
    }

    return access_token ? <Outlet/> : <Navigate to={routes.login}/>;
};

export default PrivateRoute;
