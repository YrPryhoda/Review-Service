import React from 'react';
import {Box, Button, Typography} from '@mui/material';

import {logout} from '../../features/user/actions-creators';
import {dateFormatter} from '../../helpers/dateFormatter';
import {useAppDispatch} from '../../store/hooks';
import {UserInterface} from '../../../typedef';

import styles from './styles.module.scss';
import image from './assets/icon.png';
import FlexItem from '../FlexItem';

interface IProps {
    profile: UserInterface;
    onDelete: () => void;
}

const ProfileInfo = (props: IProps) => {
    const {firstName, lastName, email, createdAt} = props.profile;
    const dispatch = useAppDispatch();

    const handlerLogout = () => {
        dispatch(logout())
    };

    return (
        <Box className={styles.profile}>
            <Typography variant={'h4'} mb={1} className={styles.profileHeader}>
                {`${firstName} ${lastName}`}
            </Typography>
            <Typography variant={'h5'} mb={3}>
                {email}
            </Typography>
            <div className={styles.imgBlock}>
                <img src={image} alt={'profile icon'}/>
            </div>

            <FlexItem width={'100%'}>
                <div className={styles.center}>
                    You have been with us since
                </div>
                <div className={styles.center}>
                    <b>{dateFormatter(createdAt!)}</b>
                </div>
            </FlexItem>


            <FlexItem className={styles.btnBlock}>
                <Button
                    onClick={handlerLogout}
                    className={styles.btn}
                    variant={'outlined'}
                    color={'info'}
                    sx={{mb: 1}}
                >
                    Logout
                </Button>
                <Button
                    onClick={props.onDelete}
                    className={styles.btn}
                    variant={'outlined'}
                    color={'error'}
                    sx={{mb: 1}}
                >
                    Delete account
                </Button>
            </FlexItem>
        </Box>
    );
};

export default ProfileInfo;
