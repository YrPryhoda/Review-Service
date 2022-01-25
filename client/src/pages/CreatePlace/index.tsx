import React, {useState} from 'react';
import {Button, Container, Grid, Typography} from '@mui/material';
import {NavLink, useNavigate} from 'react-router-dom';
import {ArrowBack} from '@mui/icons-material';

import {createPlace} from '../../features/places/actions-creators';
import {useFindByCoordinates} from './hooks/useFindByCoordinates';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {selectUser} from '../../features/user/selectors';
import {PlaceInputInterface} from '../../../typedef';

import SetGeoCoordinates from '../../components/SetGeoCoordinates';
import CreatePlaceForm from '../../components/CreatePlaceForm';
import Appbar from '../../components/Appbar';
import {routes} from '../../routes/routes';
import styles from './styles.module.scss';

const CreatePlace = () => {
    const [coordinates, setCoordinates] = useState<[number, number]>([50.44, 30.52]);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {profile} = useAppSelector(selectUser);
    useFindByCoordinates(coordinates);
    const handlerSubmitForm = (form: Omit<PlaceInputInterface, 'userId'>) => {
        const newForm: PlaceInputInterface = {
            ...form,
            userId: profile.id,
            lat: coordinates[0],
            lon: coordinates[1]
        };

        dispatch(createPlace({
            form: newForm,
            navigate
        }));
    };

    return (
        <Container maxWidth={'lg'}>
            <Appbar/>
            <Grid container item xs={12} mt={12}>
                <Grid item xs={12} mt={2}>
                    <NavLink to={routes.home}>
                        <Button startIcon={<ArrowBack/>} size={'large'}>Go Back</Button>
                    </NavLink>
                </Grid>
                <Grid item xs={12} className={styles.formTitle}>
                    <Typography variant="h4">
                        You can add place to our database
                    </Typography>
                </Grid>
                <Grid item xs={12} className={styles.formMap}>
                    <SetGeoCoordinates lat={coordinates[0]} lon={coordinates[1]} setCoords={setCoordinates}/>
                </Grid>
                <Grid item xs={12} mt={3}>
                    <CreatePlaceForm onSubmit={handlerSubmitForm}/>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CreatePlace;
