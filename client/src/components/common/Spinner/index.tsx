import React from 'react';
import {LoadingButton} from '@mui/lab';
import styles from './styles.module.scss';
import {Grid} from '@mui/material';

const Spinner = () => {
    return (
        <Grid container item xs={12} className={styles.loadingBlock}>
            <LoadingButton loading variant="outlined" className={styles.loadingBtn}>
                Submit
            </LoadingButton>
        </Grid>

    );
};

export default Spinner;
