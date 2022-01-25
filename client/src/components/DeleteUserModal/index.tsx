import React from 'react';
import {Button, Grid, Typography} from '@mui/material';

import styles from './styles.module.scss';
import ModalWindow from '../ModalWindow';

interface IProps {
    open: boolean;
    toggleOpen: () => void;
    onConfirm: () => void;
}

const DeleteUserModal = (props: IProps) => {
    return (
        <ModalWindow {...props}>
            <Typography variant="h6" component="h2" align={'center'}>
                Are you sure you want to delete this account?
            </Typography>
            <Grid container item xs={12} className={styles.btnGroup}>
                <Button
                    onClick={props.toggleOpen}
                    variant="outlined"
                    color="info"
                    size="large"
                >
                    Cancel
                </Button>
                <Button
                    onClick={props.onConfirm}
                    variant="outlined"
                    color="error"
                    size="large"
                >
                    Confirm
                </Button>
            </Grid>
        </ModalWindow>
    );
};

export default DeleteUserModal;
