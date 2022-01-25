import React from 'react';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import {Button, Grid} from '@mui/material';

import {useAppSelector} from '../../../store/hooks';
import {selectUser} from '../../../features/user/selectors';
import {LikeInterface} from '../../../../typedef';
import styles from './styles.module.scss';

interface IProps {
    likes: LikeInterface[];
    onClick: () => void;
}

const Reaction = ({likes, onClick}: IProps) => {
    const {profile} = useAppSelector(selectUser);
    const len = likes.length;
    const subtitle = likes.length && likes.find(el => el.user.id === profile?.id)
        ? len <= 1
            ? 'Only you liked this post'
            : `You and ${likes.length - 1} user(s) liked this post`

        : len < 1
            ? ''
            : `${likes.length} user(s) liked this post`;


    return (
        <Grid container item xs={12} className={styles.reaction}>
            <Button
                className={styles.btn}
                startIcon={<ThumbUpOffAltIcon/>}
                variant="outlined"
                size="small"
                onClick={onClick}
            >
                Like it
            </Button>
            <p className={styles.description}> {subtitle} </p>
        </Grid>
    );
};

export default Reaction;
