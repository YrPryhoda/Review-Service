import React from 'react';
import {Outlet} from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import Spinner from '../Spinner';

const ProfileLoader = () => {
    const {profileLoading} = useAuth();

    if (profileLoading) {
        return <Spinner />;
    }

    return <Outlet/>;
};

export default ProfileLoader;
