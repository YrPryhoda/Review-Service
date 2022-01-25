import React from 'react';
import {Container, Grid, Typography} from '@mui/material';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';

import Appbar from '../../components/Appbar';
import {routes} from '../../routes/routes';
import styles from './styles.module.scss';
import {NavLink} from 'react-router-dom';

const NotFound = () => {
    return (
        <Container maxWidth="lg">
            <Appbar/>
            <Grid container item xs={12} className={styles.container}>
                <Typography variant="h2" className={styles.header}>
                    <DoNotDisturbOnIcon className={styles.icon}/>
                    Page Not Found
                </Typography>
                <Typography variant="h4">
                    You can return to
                    <NavLink to={routes.home} className={styles.link}>
                         Home page
                    </NavLink>
                </Typography>
            </Grid>
        </Container>
    );
};

export default NotFound;
