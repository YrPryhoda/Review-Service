import React from 'react';
import {Button, Grid, TextField} from '@mui/material';
import isEqual from 'lodash.isequal';
import isEmpty from 'lodash.isempty';
import omitBy from 'lodash.omitby';

import {createPlaceRequest} from '../../features/places/requests/action-creators';
import PlaceCategoriesForm from '../PlaceCategoriesForm';
import {stringValidator} from '../../helpers/validators';
import {NotificationManager} from 'react-notifications';
import TextInputField from '../common/TextInputField';
import {useAppDispatch} from '../../store/hooks';
import {PlaceInterface} from '../../../typedef';
import useForm from '../common/hooks/useForm';
import styles from './styles.module.scss';

interface IProps {
    place: PlaceInterface;
    onClose: () => void;
}

const PlaceChangesForm = ({place, onClose}: IProps) => {
    const dispatch = useAppDispatch();
    const initialState = {
        name: place.name || '',
        houseNumber: place.houseNumber || '',
        street: place.street || '',
        website: place.website || '',
        facilities: place.facilities || '',
        contact: place.contact as string || '',
        categories: place.categories || ''
    };
    const {form, onChange, clearForm} = useForm(initialState);

    const handlerSubmit = () => {
        if (isEqual(initialState, form)) {
            NotificationManager.info('Fields have not been changed', 'Info', 1600);
            return;
        }

        const isEmptyForm = Object.values(form).every(field => !field.toString().trim());
        if (isEmptyForm
            || !stringValidator(form.street)
            || !stringValidator(form.name)
            || !stringValidator(form.categories)
        ) {
            NotificationManager.info('Some fields are required', 'Info', 1600);
            return;
        }

        const sendForm = omitBy(form, isEmpty);
        dispatch(createPlaceRequest({
            placeId: place.id,
            form: sendForm
        }));
        clearForm();
        NotificationManager.success('Request has been successfully sent', 'Success', 1600);
        return onClose();
    };

    return (
        <Grid container item xs={12} justifyContent="space-between">
            <Grid item md={5.8} xs={12}>
                <TextInputField name={'name'} label={'Place Name'} value={form.name} onChange={onChange}/>
            </Grid>
            <Grid item md={5.8} xs={12}>
                <TextInputField
                    required={false}
                    name={'website'}
                    label={'Enter website'}
                    value={form.website}
                    onChange={onChange}
                />
            </Grid>
            <Grid item md={5.8} xs={12}>
                <TextInputField name={'street'} label={'Street'} value={form.street} onChange={onChange}/>
            </Grid>
            <Grid item md={5.8} xs={12}>
                <TextInputField
                    name={'houseNumber'}
                    label={'House Number'}
                    value={form.houseNumber}
                    onChange={onChange}
                    required={false}
                />
            </Grid>
            <Grid item md={5.8} xs={12}>
                <PlaceCategoriesForm value={form.categories} onChange={onChange}/>
            </Grid>
            <Grid item md={5.8} xs={12}>
                <TextInputField
                    name={'contact'}
                    label={'Add contact information'}
                    value={form.contact}
                    onChange={onChange}
                    required={false}
                />
            </Grid>

            <Grid item xs={12} sx={{mt: 1.5}}>
                <TextField
                    name="facilities"
                    label="Add a few available facilities at this place"
                    value={form.facilities}
                    onChange={onChange}
                    fullWidth
                />
            </Grid>
            <Grid container item xs={12} justifyContent={'center'} className={styles.submitWrap}>
                <Button
                    variant={'outlined'}
                    sx={{width: '200px', mt: 1}}
                    onClick={onClose}
                    size={'large'}
                >
                    Cancel
                </Button>
                <Button
                    variant={'contained'}
                    sx={{width: '200px', mt: 1}}
                    onClick={handlerSubmit}
                    size={'large'}
                >
                    Submit
                </Button>
            </Grid>
        </Grid>
    );
};

export default PlaceChangesForm;
