import React from 'react';
import {AlertTitle, Stack, Alert} from '@mui/material';
import {NavLink} from 'react-router-dom';

import {routes} from '../../routes/routes';
import styles from './styles.module.scss';

const CommentAlert = () => {
    return (
        <Stack sx={{width: '100%'}} spacing={2}>
            <Alert severity="warning" className={styles.alertBlock}>
                <AlertTitle sx={{fontSize: '22px'}}>Info</AlertTitle>
                Only authorized users can leave comments. You need to
                <strong>
                    <NavLink to={routes.login}> Sign In </NavLink>
                </strong>.
            </Alert>
        </Stack>

    );
};

export default CommentAlert;
