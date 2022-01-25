import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {UserInputInterface, UserAuthInterface, UserEditForm} from 'typedef';
import {routes} from '../../routes/routes';
import {NavigateFunction} from 'react-router-dom';
import {NotificationManager} from 'react-notifications';
import {TokenService} from '../../services/token-service';
import {setHeaders} from '../../helpers/setHeaders';

const apiUrl = 'http://localhost:5000';
const moduleName = 'users';

export const register = createAsyncThunk(`${moduleName}/register`,
    async (payload: { form: UserInputInterface, navigate: NavigateFunction }, {rejectWithValue}) => {
        try {
            const response = await fetch(`${apiUrl}/api/auth/register`, {
                method: 'POST',
                body: JSON.stringify(payload.form),
                headers: setHeaders()
            });
            const newUser = await response.json();

            if (!response.ok) {
                throw rejectWithValue(newUser);
            }

            if (newUser && newUser.id) {
                payload.navigate(`${routes.register}/finish/${newUser.id}`);
                NotificationManager.success('User Created', 'Success', 3000);
                return newUser;
            }
        } catch (error: any) {
            NotificationManager.error(error.message, 'Error', 3000);
            throw rejectWithValue(error);
        }
    });

export const signupConfirm = createAsyncThunk(
    `${moduleName}/register-confirm`,
    async (payload: { userId: string, link: string, navigate: NavigateFunction }, {rejectWithValue}) => {
        try {
            const result = await fetch(`${apiUrl}/api/auth/confirm`, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: setHeaders()
            });

            if (!result.ok) {
                payload.navigate(routes.login);
                throw new Error('Wrong credentials');
            }

            return await result.json();
        } catch (e) {
            NotificationManager.error(e.message, 'Error', 3000);
            throw rejectWithValue(e);
        }
    }
);
export const login = createAsyncThunk(`${moduleName}/login`, async (user: UserAuthInterface, {rejectWithValue}) => {
    try {
        const result = await fetch(`${apiUrl}/api/auth/login`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: setHeaders()
        });

        if (!result.ok) {
            throw new Error('Wrong credentials');
        }

        const data = await result.json();
        data.access_token && TokenService.setToken(data.access_token);

        return data;
    } catch (e: any) {
        NotificationManager.error(e.message, 'Error', 3000);
        console.log(e, 'ERROR');
        throw rejectWithValue(e);
    }
});

export const logout = createAsyncThunk(`${moduleName}/logout`, async () => {
    try {
        await fetch(`${apiUrl}/api/auth/logout`, {
            method: 'GET',
            headers: setHeaders()
        })
        TokenService.removeToken();
        NotificationManager.info('You have been logout', 'Info', 3000);
        return null;
    } catch (e) {
        NotificationManager.error('Something goes wrong', 'Error', 3000);
        console.log(e);
    }
});

export const getProfile = createAsyncThunk(`${moduleName}/profile`, async (payload, {
    rejectWithValue
}) => {
    try {
        const result = await fetch(`${apiUrl}/api/users/profile`, {
            method: 'GET',
            headers: setHeaders()
        });
        return await result.json();
    } catch (e) {
        NotificationManager.error('Profiled loading failed', 'Error', 3000);
        throw rejectWithValue(e);
    }
});

export const getUserById = createAsyncThunk(
    `${moduleName}/register-finish`,
    async (payload: { id: string, navigate: NavigateFunction }, {rejectWithValue}) => {
        try {
            const response = await fetch(`${apiUrl}/api/auth/register/finish/${payload.id}`, {
                method: 'GET',
                headers: setHeaders()
            });
            const data = await response.json();

            if (!response.ok) {
                payload.navigate(routes.register);
                throw rejectWithValue(data);
            }

            return data;
        } catch (e) {
            NotificationManager.error(e.payload.message, 'Error', 3000);
            throw rejectWithValue(e);
        }
    }
);

export const updateUser = createAsyncThunk(`${moduleName}/update-profile`,
    async (formEdit: UserEditForm, {rejectWithValue}) => {
        try {
            const result = await fetch(`${apiUrl}/api/users`, {
                method: 'PUT',
                body: JSON.stringify(formEdit),
                headers: setHeaders()
            });

            const res = await result.json();
            NotificationManager.success('Updated successfully', 'Success', 3000);
            return res;
        } catch (e) {
            NotificationManager.error('Update failed', 'Error', 3000);
            throw rejectWithValue(e);
        }
    });

export const deleteProfile = createAsyncThunk(`${moduleName}/delete-profile`,
    async (id: string, {rejectWithValue}) => {
        try {
            const result = await fetch(`${apiUrl}/api/users/${id}`, {
                method: 'DELETE',
                headers: setHeaders()
            });

            if (!result.ok) {
                throw rejectWithValue(await result.json());
            }

            return await logout();
        } catch (e: any) {
            console.log(e);
            NotificationManager.error(e.message, 'Error', 3000);
            throw rejectWithValue(e);
        }
    });

export const clearAll = createAction('users/clear');
