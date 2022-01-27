import React, {useState} from 'react';
import {Container, Grid} from '@mui/material';

import {approvePlaceRequest, rejectPlaceRequest} from '../../features/places/requests/action-creators';
import {selectRequests} from '../../features/places/requests/selectors';
import PlaceRequestDetails from '../../components/PlaceRequestDetails';
import PlaceRequestsList from '../../components/PlaceRequestsList';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {PlaceChangeRequestInterface} from '../../../typedef';
import ModalWindow from '../../components/ModalWindow';
import Spinner from '../../components/common/Spinner';
import Appbar from '../../components/Appbar';
import styles from './styles.module.scss';

const PlaceRequests = () => {
    const {all, loading} = useAppSelector(selectRequests);
    const [requestSelected, setRequestSelected] = useState<PlaceChangeRequestInterface | null>(null);
    const dispatch = useAppDispatch();

    const handlerRowClick = (id: number) => {
        const place = all.find(el => el.id === id);
        if (place) {
            setRequestSelected(place);
        }
    };
    const toggleModalClose = () => setRequestSelected(null);

    const handlerRejectRequestChanges = () => {
        dispatch(rejectPlaceRequest(requestSelected!.id));
        return toggleModalClose();
    };

    const handlerApproveRequestChanges = () => {
        const {user, place, createdAt, ...form} = requestSelected!;
        dispatch(approvePlaceRequest({id: place.id, form}));
        return toggleModalClose();
    };

    const modalPlaceRequestSelected = requestSelected
        ? <ModalWindow open={!!requestSelected} toggleOpen={toggleModalClose}>
            <PlaceRequestDetails
                onApprove={handlerApproveRequestChanges}
                onReject={handlerRejectRequestChanges}
                onClose={toggleModalClose}
                details={requestSelected}
            />
        </ModalWindow>
        : null;

    const renderPage = loading
        ? <Spinner/>
        : <Grid container item xs={12}>
            <PlaceRequestsList onClick={handlerRowClick}/>
        </Grid>;


    return (
        <Container maxWidth={'xl'} className={styles.container}>
            <Appbar/>
            {renderPage}
            {modalPlaceRequestSelected}
        </Container>
    );
};

export default PlaceRequests;
