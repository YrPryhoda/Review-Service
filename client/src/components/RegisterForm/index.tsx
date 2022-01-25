import React from 'react';
import Fingerprint from '@mui/icons-material/Fingerprint';
import {NotificationManager} from 'react-notifications';
import {NavLink, useNavigate} from 'react-router-dom';
import {Box, Button, Grid} from '@mui/material';

import {isEmail, stringLengthValidation, stringValidator} from '../../helpers/validators';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {register} from '../../features/user/actions-creators';
import {UserInputInterface} from '../../../typedef';
import useForm from '../common/hooks/useForm';

import TextInputField from '../common/TextInputField';
import {routes} from '../../routes/routes';
import Spinner from '../common/Spinner';

const RegisterForm = () => {
    const {form, onChange, clearForm} = useForm<UserInputInterface>({
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    });

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector(state => state.user);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (
            !stringValidator(form.firstName) ||
            !stringValidator(form.lastName) ||
            (!stringValidator(form.email) || !isEmail(form.email)) ||
            (!stringValidator(form.password) || !stringLengthValidation(form.password, 6))
        ) {
            return NotificationManager.warning('Form incorrect. Fill in all required fields', 'Warning', 3000);
        }
        dispatch(register({form, navigate}));
        clearForm();
    };

    return (
        user.loading
            ? <Spinner />
            : <Box component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
                <TextInputField
                    autoFocus={true}
                    onChange={onChange}
                    value={form.firstName}
                    name={'firstName'}
                    label={'First name'}
                />

                <TextInputField
                    onChange={onChange}
                    value={form.lastName}
                    name={'lastName'}
                    label={'Last name'}
                />

                <TextInputField
                    onChange={onChange}
                    value={form.email}
                    name={'email'}
                    label={'Email address'}
                />

                <TextInputField
                    onChange={onChange}
                    value={form.password}
                    name={'password'}
                    type={'password'}
                    label={'Password at least 6 symbols'}
                />

                <Button
                    startIcon={<Fingerprint/>}
                    type="submit"
                    fullWidth
                    size={'large'}
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    Register
                </Button>
                <Grid container>
                    <Grid item>
                        <NavLink to={routes.login}>
                            Already have an account? Sign In
                        </NavLink>
                    </Grid>
                </Grid>
            </Box>
    );
};

export default RegisterForm;
