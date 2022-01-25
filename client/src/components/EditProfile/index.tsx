import React from 'react';
import {Button, Divider, Grid, TextField, Typography} from '@mui/material';
import {NotificationManager} from 'react-notifications';
import {NavLink} from 'react-router-dom';

import {stringLengthValidation, stringValidator} from '../../helpers/validators';
import {updateUser} from '../../features/user/actions-creators';
import {UserEditForm, UserInterface} from '../../../typedef';
import {useAppDispatch} from '../../store/hooks';
import useForm from '../common/hooks/useForm';
import styles from './styles.module.scss';

interface IProps {
    profile: UserInterface;
}

const EditProfile = (props: IProps) => {
    const dispatch = useAppDispatch();
    const {firstName, lastName, email} = props.profile;
    const initialState = {
        firstName,
        lastName,
        password: '',
        confirmPassword: ''
    };
    const {form, onChange, clearForm} = useForm(initialState);

    const handlerSubmit = () => {
        const formToSubmit = {} as UserEditForm;

        if (stringValidator(form.password)) {
            if (!stringLengthValidation(form.password, 6)) {
                return NotificationManager.warning('Password must be more then 6 symbols', 'Warning', 3000);
            }
            if (form.password !== form.confirmPassword) {
                return NotificationManager.warning('Incorrect confirm password', 'Warning', 3000);
            }

            formToSubmit.password = form.password;
        }

        if (!stringValidator(form.firstName)) {
            return NotificationManager.warning('First Name must not be empty', 'Warning', 3000);
        }

        if (!stringValidator(form.lastName)) {
            return NotificationManager.warning('Last Name must not be empty', 'Warning', 3000);
        }

        if (form.firstName === firstName && lastName === form.lastName && !form.password) {
            return NotificationManager.info('Nothing changed', 'Info', 3000);
        }

        dispatch(updateUser({
            ...formToSubmit,
            firstName: form.firstName,
            lastName: form.lastName,
            email: email
        }));
    };

    const handlerClearForm = () => {
        clearForm();
    };

    return (
        <Grid item xs={12} className={styles.formContainer}>
            <Typography variant="h4" gutterBottom sx={{fontWeight: 800, mb: 3}}>
                Edit Profile
            </Typography>

            <Typography variant="h6" gutterBottom sx={{mb: 3}}>
                <NavLink to={'#'} className={styles.profileLink}>
                    User Information
                </NavLink>
            </Typography>
            <Divider sx={{mb: 4}}/>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} className={styles.profileField}>
                    <TextField
                        required
                        name="firstName"
                        label="First name"
                        fullWidth
                        value={form.firstName}
                        onChange={onChange}
                        autoComplete="given-name"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6} className={styles.profileField}>
                    <TextField
                        required
                        name="lastName"
                        label="Last name"
                        value={form.lastName}
                        onChange={onChange}
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={12} className={styles.profileField}>
                    <TextField
                        required
                        disabled
                        name="email"
                        label="Current Email"
                        defaultValue={email}
                        fullWidth
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={12} sm={6} className={styles.profileField}>
                    <TextField
                        required
                        type={'password'}
                        name="password"
                        label="New Password"
                        fullWidth
                        placeholder={'**********'}
                        value={form.password}
                        onChange={onChange}
                        variant="standard"
                        autoComplete="new-password"
                    />
                </Grid>
                <Grid item xs={12} sm={6} className={styles.profileField}>
                    <TextField
                        required
                        type={'password'}
                        name="confirmPassword"
                        label="Confirm Password"
                        placeholder={'**********'}
                        value={form.confirmPassword}
                        onChange={onChange}
                        fullWidth
                        variant="standard"
                    />
                </Grid>

                <Grid item container xs={12} className={styles.profileField} gap={3} justifyContent={'flex-end'}>
                    <Button
                        onClick={handlerClearForm}
                        className={styles.btn}
                        variant={'outlined'}
                        color={'error'}
                        size={'large'}
                    >
                        Reset
                    </Button>

                    <Button
                        onClick={handlerSubmit}
                        className={styles.btn}
                        variant={'outlined'}
                        color={'info'}
                        size={'large'}
                    >
                        Confirm
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default EditProfile;
