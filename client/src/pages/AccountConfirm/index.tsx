import React from 'react';
import {NavLink, useParams} from 'react-router-dom';
import {Container, Grid, Typography} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

import useConfirmAccount from './hooks/useConfirmAccount';
import Spinner from '../../components/common/Spinner';
import Appbar from '../../components/Appbar';
import {routes} from '../../routes/routes';
import styles from './styles.module.scss';

const AccountConfirm = () => {
    const params = useParams<{ userId: string, signupConfirmId: string }>();
    const {loading, profile} = useConfirmAccount(params.userId!, params.signupConfirmId!);

    if (loading) {
        return <Spinner />;
    }


    return (
        <Container maxWidth="lg" className={styles.container}>
            <Appbar/>
            <Grid item xs={12} className={styles.messageBlock}>
                <CheckIcon className={styles.icon}/>
                <Typography variant="h4">
                    {`${profile.firstName} ${profile.lastName}, `} thank you for sign up.
                </Typography>
                <Typography variant="h5">
                    Account <b>{profile.email}</b> confirmed
                </Typography>
                <Typography variant="h6">
                    Now you can
                    <NavLink to={routes.login} className={styles.link}>
                        Sign In
                    </NavLink>
                </Typography>
            </Grid>
        </Container>
    );
};

export default AccountConfirm;
