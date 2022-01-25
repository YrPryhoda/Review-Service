import React from 'react';
import Fingerprint from '@mui/icons-material/Fingerprint';
import {Box, Button, Grid} from '@mui/material';
import {NavLink} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {login} from '../../features/user/actions-creators';
import {UserAuthInterface} from '../../../typedef';
import useForm from '../common/hooks/useForm';
import {routes} from '../../routes/routes';

import TextInputField from '../common/TextInputField';
import Spinner from '../common/Spinner';

const LoginForm = () => {
    const {form, onChange, clearForm} = useForm<UserAuthInterface>({
        email: '',
        password: ''
    });

    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(login(form));
        clearForm();
    };

    return (
        user.loading
            ? <Spinner />
            : <Box component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
                <TextInputField
                    onChange={onChange}
                    value={form.email}
                    name={'email'}
                    label={'Email address'}
                    autoFocus={true}
                />

                <TextInputField
                    onChange={onChange}
                    value={form.password}
                    type={'password'}
                    name={'password'}
                    label={'Password'}
                />

                <Button
                    startIcon={<Fingerprint/>}
                    type="submit"
                    fullWidth
                    size={'large'}
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item>
                        <NavLink to={routes.register}>
                            {'Don\'t have an account? Sign Up'}
                        </NavLink>
                    </Grid>
                </Grid>
            </Box>
    );
};

export default LoginForm;
