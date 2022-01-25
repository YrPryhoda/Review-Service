import React, {useEffect, useState} from 'react';

import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {getProfile} from '../../../features/user/actions-creators';
import {selectUser} from '../../../features/user/selectors';

const useAuth = () => {
    const dispatch = useAppDispatch();
    const {access_token} = useAppSelector(selectUser);
    const [profileLoading, setProfileLoading] = useState(true);

    useEffect(() => {
        if (profileLoading && !access_token) {
            dispatch(getProfile()).then(() => setProfileLoading(false));
        } else {
            setProfileLoading(false);
        }
    }, [dispatch, access_token, profileLoading, getProfile]);

    return {
        access_token,
        profileLoading
    };
};

export default useAuth;
