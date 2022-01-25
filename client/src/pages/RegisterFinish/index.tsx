import React from 'react';
import {NavLink, useParams} from 'react-router-dom';
import {Container, Grid, Typography} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import {useRegisterFinish} from './hooks/useRegisterFinish';
import Spinner from '../../components/common/Spinner';
import Appbar from '../../components/Appbar';
import {routes} from '../../routes/routes';
import styles from './styles.module.scss';

const RegisterFinish = () => {
    const {id} = useParams();
    const {loading, profile} = useRegisterFinish(id!);

    if (loading) {
        return <Spinner/>;
    }

    return (
        <Container maxWidth="lg" className={styles.container}>
            <Appbar/>
            <Grid container>
                <Grid item xs={12} className={styles.item}>
                    <CheckCircleOutlineIcon className={styles.icon}/>
                    <Typography variant="h3">
                        Registration successful!
                    </Typography>
                </Grid>
                <Grid item xs={12} className={styles.item}>
                    <Typography variant="h6">
                        Please check email <b>{profile.email}</b> and follow the link to confirm your account
                    </Typography>
                </Grid>
                <Grid item xs={12} className={styles.item}>
                    <Typography variant="h6">
                        Then you can fluently sign in via link
                        <NavLink to={routes.login} className={styles.link}>
                            Sign In Page
                        </NavLink>
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default RegisterFinish;
