import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {selectUser} from '../../../features/user/selectors';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {getUserById} from '../../../features/user/actions-creators';

export const useRegisterFinish = (id: string) => {
        const {profile} = useAppSelector(selectUser);
        const dispatch = useAppDispatch();
        const navigate = useNavigate();
        const [loading, setLoading] = useState(true);
        useEffect(() => {
            dispatch(getUserById({id, navigate}))
                .then(() => setLoading(false));
        }, [profile]);

        return {
            profile,
            loading
        };
    }
;
