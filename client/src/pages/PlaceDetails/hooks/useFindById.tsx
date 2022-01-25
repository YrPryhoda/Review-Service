import React, {useEffect, useState} from 'react';

import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {findById} from '../../../features/places/actions-creators';
import {selectPlaces} from '../../../features/places/selectors';

const useFindById = (placeId: string) => {
    const [stateLoading, setLoading] = useState(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        localStorage.removeItem('page');
        dispatch(findById(placeId)).then(() => setLoading(false));
    }, []);

    const {details, error} = useAppSelector(selectPlaces);
    return {
        loading: stateLoading,
        error,
        details
    };
};

export default useFindById;
