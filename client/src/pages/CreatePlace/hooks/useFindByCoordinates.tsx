import {useEffect} from 'react';
import {useAppDispatch} from '../../../store/hooks';
import {geocode} from '../../../features/places/actions-creators';

export const useFindByCoordinates = ([lat, lon]: [number, number]) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(geocode({lat, lon}));
    }, [dispatch, geocode, lat, lon]);

    return null;
};
