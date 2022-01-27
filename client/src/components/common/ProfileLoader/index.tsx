import React from 'react';
import {Outlet} from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import Spinner from '../Spinner';
import useLoadAdminData from '../hooks/useLoadAdminData';

const ProfileLoader = () => {
    const {profileLoading} = useAuth();
    const {loading} = useLoadAdminData();

    if (profileLoading) {
        return <Spinner/>;
    }

    return <Outlet/>;
};

export default ProfileLoader;
