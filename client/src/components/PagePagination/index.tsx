import React from 'react';
import {Pagination} from '@mui/material';

import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {loadAll} from '../../features/places/actions-creators';
import {selectPlaces} from '../../features/places/selectors';

const PagePagination = () => {
    const dispatch = useAppDispatch();
    const {page, places} = useAppSelector(selectPlaces);

    const handlerClick = (event: React.ChangeEvent<unknown>, navPage: number) => {
        localStorage.setItem('page', (navPage).toString());
        dispatch(loadAll(navPage));
    };

    return places.length >= 20
        ? <Pagination
            onChange={handlerClick}
            page={page}
            count={places.length < 20 ? page : 6}
            siblingCount={1}
            boundaryCount={0}
            size="large"
            variant="outlined"
            shape="rounded"
        />
        : null;
};

export default PagePagination;
