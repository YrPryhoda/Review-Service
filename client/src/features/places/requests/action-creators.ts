import {createAsyncThunk} from '@reduxjs/toolkit';
import {setHeaders} from '../../../helpers/setHeaders';
import {NotificationManager} from 'react-notifications';
import {PlaceChangeRequestInputInterface} from '../../../../typedef';

const apiUrl = 'http://localhost:5000';
const moduleName = 'requests';

export const getRequests = createAsyncThunk(
    `${moduleName}/get-all`,
    async (undefined, {rejectWithValue}) => {
        try {
            const response = await fetch(
                `${apiUrl}/api/requests`, {
                    headers: setHeaders()
                }
            );
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            return data;
        } catch (e) {
            NotificationManager.error(e.message, 'Error', 3000);
            console.log(e);
            throw rejectWithValue(e);
        }
    }
);

export const createPlaceRequest = createAsyncThunk(
    `${moduleName}/create`,
    async (payload: { form: { [k: string]: any }, placeId: string }, {rejectWithValue}) => {
        try {
            const response = await fetch(
                `${apiUrl}/api/requests/create/${payload.placeId}`, {
                    method: 'POST',
                    body: JSON.stringify(payload.form),
                    headers: setHeaders()
                }
            );
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            return data;
        } catch (e) {
            NotificationManager.error(e.message, 'Error', 3000);
            console.log(e);
            throw rejectWithValue(e);
        }
    }
);

export const rejectPlaceRequest = createAsyncThunk(
    `${moduleName}/approve-reject`,
    async (id:number, {rejectWithValue}) => {
        try {
            const response = await fetch(
                `${apiUrl}/api/requests/${id}`, {
                    method: 'DELETE',
                    headers: setHeaders()
                }
            );
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }
            NotificationManager.success('Action complete', 'Success', 3000);
            return data;
        } catch (e) {
            NotificationManager.error(e.message, 'Error', 3000);
            console.log(e);
            throw rejectWithValue(e);
        }
    }
)


export const approvePlaceRequest = createAsyncThunk(
    `${moduleName}/approve-reject`,
    async (payload: {id: string, form: PlaceChangeRequestInputInterface}, {rejectWithValue}) => {
        try {
            const response = await fetch(
                `${apiUrl}/api/requests/confirm/${payload.id}`, {
                    method: 'POST',
                    body: JSON.stringify(payload.form),
                    headers: setHeaders()
                }
            );
            const data = await response.json();

            if (!response.ok) {
                throw Error(data.message);
            }
            NotificationManager.success('Data updated', 'Success', 3000);
            return data;
        } catch (e) {
            NotificationManager.error(e.message, 'Error', 3000);
            console.log(e);
            throw rejectWithValue(e);
        }
    }
)
