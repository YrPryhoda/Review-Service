import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {RemoveScroll} from 'react-remove-scroll';
import {Grid} from '@mui/material';

import styles from './styles.module.scss';

interface IProps {
    zoomImg: string;
    onClose: () => void;
}

const ZoomedImage = ({zoomImg, onClose}:IProps) => {
    return (
        <RemoveScroll>
            <Grid className={styles.zoomImgBlock}>
                <div className={styles.zoomContent}>
                    <CloseIcon className={styles.zoomClose} onClick={onClose}/>
                    <img src={zoomImg} alt={zoomImg}/>
                </div>
            </Grid>
        </RemoveScroll>
    );
};

export default ZoomedImage;
