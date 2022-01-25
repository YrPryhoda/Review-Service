import React from 'react';
import {Typography} from '@mui/material';

import {selectPlaces} from '../../features/places/selectors';
import {useAppSelector} from '../../store/hooks';

const QueryResult = () => {
    const {findQuery} = useAppSelector(selectPlaces);
    const query = Object.values(findQuery).filter(el => el && !!el.length).join(', ');

    return (
        <Typography variant={'h4'} align={'center'} sx={{mb: 3}}>
            Here is results for <b>"{query}"</b>
        </Typography>
    );
};

export default QueryResult;
