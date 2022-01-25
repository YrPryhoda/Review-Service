import React, {useEffect} from 'react';
import {NotificationManager} from 'react-notifications';
import {Button, Grid, TextField} from '@mui/material';

import {selectPlaces} from '../../features/places/selectors';
import {stringValidator} from '../../helpers/validators';
import {PlaceInputInterface} from '../../../typedef';
import {useAppSelector} from '../../store/hooks';
import useForm from '../common/hooks/useForm';

import PlaceCategoriesForm from '../PlaceCategoriesForm';
import TextInputField from '../common/TextInputField';
import styles from './styles.module.scss';
import Spinner from '../common/Spinner';

interface IProps {
    onSubmit: (form: Omit<PlaceInputInterface, 'userId'>) => void;
}

const CreatePlaceForm = ({onSubmit}: IProps) => {
    const {geocoded, loading} = useAppSelector(selectPlaces);

    const initialState = {
        name: '',
        houseNumber: geocoded?.houseNumber || '',
        street: geocoded?.street || '',
        city: geocoded?.city || '',
        website: '',
        facilities: '',
        contact: '',
        categories: ''
    };
    const {form, onChange, setForm, clearForm} = useForm(initialState);

    useEffect(() => {
        if (!loading) {
            setForm(initialState);
        }
    }, [loading, setForm]);

    const handlerSubmit = () => {
        const {city, street, name, categories} = form;
        if (
            !stringValidator(city) || !stringValidator(street) ||
            !stringValidator(name) || !stringValidator(categories)
        ) {
            return NotificationManager.warning('Fill in all required fields', 'Warning', 3000);
        }

        onSubmit(form);
        clearForm();
    };

    return (
        <Grid container justifyContent="space-between">
            <Grid item xs={12} className={styles.formLoading}>
                {loading && <Spinner/>}
            </Grid>
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
                <TextInputField name={'city'} label={'City'} value={form.city} onChange={onChange}/>
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

            <Grid item md={5.8} xs={12} sx={{mt: 1.5}}>
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
                    sx={{width: '200px'}}
                    onClick={handlerSubmit}
                    size={'large'}
                >
                    Submit
                </Button>
            </Grid>
        </Grid>
    );
};

export default CreatePlaceForm;
