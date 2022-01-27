import React from 'react';
import useAuth from '../hooks/useAuth';
import Spinner from '../Spinner';
import {Navigate, Outlet} from 'react-router-dom';
import {routes} from '../../../routes/routes';
import {UserRole} from '../../../typing/enums';
import useLoadAdminData from '../hooks/useLoadAdminData';

const AdminRoutes = () => {
    const {profileLoading, profile} = useAuth();
    const {loading} = useLoadAdminData();

    if (profileLoading) {
        return <Spinner/>;
    }

    return profile.userRole === UserRole.Admin ? <Outlet/> : <Navigate to={routes.login}/>;
};

export default AdminRoutes;
