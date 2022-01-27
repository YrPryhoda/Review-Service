import React from 'react';
import {Button, Grid, Typography} from '@mui/material';
import {NavLink} from 'react-router-dom';

import {PlaceChangeRequestInterface} from '../../../typedef';
import PlaceRequestDiffField from '../PlaceRequestDiffField';
import PlaceCategoriesForm from '../PlaceCategoriesForm';
import useForm from '../common/hooks/useForm';
import {routes} from '../../routes/routes';
import styles from './styles.module.scss';

interface IProps {
    details: PlaceChangeRequestInterface,
    onClose: () => void;
    onReject: () => void;
    onApprove: () => void;
}

const PlaceRequestDetails = ({details, onClose, onReject, onApprove}: IProps) => {
    const {place, user, id, ...fields} = details;
    const {form, onChange} = useForm(fields);

    return (
        <Grid container item xs={12} justifyContent="space-between">
            <Grid container item xs={12}>
                <Grid item xs={12} className={styles.title}>
                    <Typography variant="h6">
                        {place.formatted}.
                        <NavLink
                            to={`${routes.places}/${place.id}`}
                            className={styles.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Link to place
                        </NavLink>
                    </Typography>
                </Grid>
            </Grid>
            <Grid item md={5.8} xs={12}>
                <PlaceRequestDiffField
                    prevVal={place.name}
                    nextVal={fields.name}
                    onChange={onChange}
                    label={'Place Name'}
                    value={form.name || ''}
                    name={'name'}
                />
            </Grid>
            <Grid item md={5.8} xs={12}>
                <PlaceRequestDiffField
                    prevVal={place.website}
                    nextVal={fields.website}
                    required={false}
                    name={'website'}
                    label={'Enter website'}
                    value={form.website || ''}
                    onChange={onChange}
                />
            </Grid>
            <Grid item md={5.8} xs={12}>
                <PlaceRequestDiffField
                    prevVal={place.street}
                    nextVal={fields.street}
                    name={'street'}
                    label={'Street'}
                    onChange={onChange}
                    value={form.street || ''}
                />
            </Grid>
            <Grid item md={5.8} xs={12}>
                <PlaceRequestDiffField
                    prevVal={place.houseNumber}
                    nextVal={fields.houseNumber}
                    name={'houseNumber'}
                    label={'House Number'}
                    value={form.houseNumber || ''}
                    onChange={onChange}
                    required={false}
                />
            </Grid>
            <Grid item md={5.8} xs={12}>
                <PlaceCategoriesForm
                    value={form.categories || ''}
                    onChange={onChange}
                />
            </Grid>
            <Grid item md={5.8} xs={12}>
                <PlaceRequestDiffField
                    prevVal={place.contact as string}
                    nextVal={fields.contact}
                    onChange={onChange}
                    label={'Add contact information'}
                    name={'contact'}
                    required={false}
                    value={form.contact || ''}
                />
            </Grid>

            <Grid item xs={12} sx={{mt: 1.5}}>
                <PlaceRequestDiffField
                    prevVal={place.facilities as string}
                    nextVal={fields.facilities}
                    name="facilities"
                    label="Add a few available facilities at this place"
                    onChange={onChange}
                    value={form.facilities || ''}
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
                    variant={'outlined'}
                    color="error"
                    sx={{width: '200px', mt: 1}}
                    onClick={onReject}
                    size={'large'}
                >
                    Reject
                </Button>
                <Button
                    variant={'contained'}
                    sx={{width: '200px', mt: 1}}
                    onClick={onApprove}
                    size={'large'}
                >
                    Approve
                </Button>
            </Grid>
        </Grid>
    );
};

export default PlaceRequestDetails;
