import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {signupConfirm} from '../../../features/user/actions-creators';
import {selectUser} from '../../../features/user/selectors';
import {useNavigate} from 'react-router-dom';

const useConfirmAccount = (userId: string, link: string) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {error, profile} = useAppSelector(selectUser);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(signupConfirm({
            userId,
            link,
            navigate
        }))
            .then(() => setLoading(false));
    }, []);

    return {
        error,
        loading,
        profile
    };
};

export default useConfirmAccount;
