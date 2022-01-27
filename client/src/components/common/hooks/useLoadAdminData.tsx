import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {getRequests} from '../../../features/places/requests/action-creators';
import {selectUser} from '../../../features/user/selectors';
import {UserRole} from '../../../typing/enums';

const useLoadAdminData = () => {
    const dispatch = useAppDispatch();
    const {profile} = useAppSelector(selectUser);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (profile && profile.userRole === UserRole.Admin) {
            dispatch(getRequests())
                .then(() => setLoading(false))
                .catch(() => setLoading(false));
        }
        setLoading(false);
    }, [profile]);

    return {loading};
};

export default useLoadAdminData;
