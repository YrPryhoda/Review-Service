import React from 'react';
import {Card, CardActions, CardContent, Skeleton, Typography} from '@mui/material';
import {NavLink} from 'react-router-dom';

import CardGeolocation from '../CardGeolocation';
import {PlaceInterface} from '../../../typedef';
import PrimaryButton from '../common/Button';
import {routes} from '../../routes/routes';
import styles from './styles.module.scss';

interface IProps {
    place: PlaceInterface;
}

const PlaceCard = ({place}: IProps) => {
    const img = place.image
        ? <img src={place.image} alt={place.name}/>
        : place.lat && place.lon
            ? <CardGeolocation lat={place.lat} lon={place.lon} name={place.addressLine2}/>
            : <Skeleton animation={false} variant="rectangular" width={'100%'} height={180}/>;

    return (
        <Card className={styles.card}>
            <div className={styles.img_wrapper}>
                {img}
            </div>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {place.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {place.formatted}
                </Typography>
            </CardContent>
            <CardActions>
                <NavLink to={`${routes.places}/${place.id}`} className={styles.link}>
                    <PrimaryButton value={'Details'}/>
                </NavLink>
            </CardActions>
        </Card>
    );
};

export default PlaceCard;
