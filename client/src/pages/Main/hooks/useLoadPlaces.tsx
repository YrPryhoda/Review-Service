import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {loadAll} from '../../../features/places/actions-creators';
import {selectPlaces} from '../../../features/places/selectors';

const useLoadPlaces = () => {
    const dispatch = useAppDispatch();
    const {places, loading} = useAppSelector(selectPlaces);

    useEffect(() => {
        if (!places.length) {
            dispatch(loadAll());
        }
    }, [loadAll, dispatch]);

    return {
        places,
        loading
    };
};

export default useLoadPlaces;
