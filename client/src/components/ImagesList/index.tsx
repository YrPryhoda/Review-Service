import React from 'react';
import {Grid} from '@mui/material';

import {ImageInterface} from '../../../typedef';
import styles from './styles.module.scss';

interface IProps {
    urls: ImageInterface[];
    onClick: (url: string) => void;
}

const ImagesList = ({urls, onClick}: IProps) => {
    return (
        <Grid container item xs={12} className={styles.imgBlock}>
            {urls.map(el => <img
                src={`http://localhost:5000/api/comments/files/${el.url}`}
                onClick={(e) => onClick((e.target as HTMLImageElement).currentSrc)}
                className={styles.img}
                key={el.id}
                alt={'img'}
            />)}
        </Grid>
    );
};

export default ImagesList;
