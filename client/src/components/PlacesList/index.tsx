import React from 'react';
import {Grid} from '@mui/material';

import {PlaceInterface} from '../../../typedef';
import styles from './styles.module.scss';
import PlaceCard from '../PlaceCard';

interface IProps {
    places: PlaceInterface[];
}

const PlacesList = (props: IProps) => {
    return (
        <Grid container item xs={12} sm={12} md={12} spacing={1} gap={4} className={styles.cardList}>
            {props.places.map(place => <PlaceCard key={place.id} place={place}/>)}
        </Grid>
    );
};

export default PlacesList;
