import React, {useState} from 'react';
import {Container, Grid, Paper} from '@mui/material';

import {deleteProfile} from '../../features/user/actions-creators';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {selectUser} from '../../features/user/selectors';

import DeleteUserModal from '../../components/DeleteUserModal';
import ProfileInfo from '../../components/ProfileInfo';
import EditProfile from '../../components/EditProfile';
import Appbar from '../../components/Appbar';
import styles from './styles.module.scss';

const Profile = () => {
    const {profile} = useAppSelector(selectUser);
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useAppDispatch();

    const handlerToggleModal = () => setModalOpen(!modalOpen);
    const handlerConfirm = () => {
        dispatch(deleteProfile(profile.id))
            .then(() => setModalOpen(false));
    };

    const modalWindow = modalOpen
        ? <DeleteUserModal open={modalOpen} toggleOpen={handlerToggleModal} onConfirm={handlerConfirm}/>
        : null;

    return (
        <>
            <Appbar/>
            <Container maxWidth="lg" sx={{mt: 14}}>
                <Grid container item xs={12} gap={4} direction="row">
                    <Grid item lg={4} md={4} xs={12}>
                        <Paper className={styles.paper}>
                            <ProfileInfo profile={profile} onDelete={handlerToggleModal}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={7.6} className={styles.paper}>
                        <Paper style={{height: '100%'}} className={`${styles.paper} ${styles.profile}`}>
                            <EditProfile profile={profile}/>
                        </Paper>
                    </Grid>
                </Grid>
                {modalWindow}
            </Container>
        </>
    );
};

export default Profile;
