import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {NotificationManager} from 'react-notifications';

import {PlaceInputInterface} from '../../../typedef';
import {setHeaders} from '../../helpers/setHeaders';
import {NavigateFunction} from 'react-router-dom';
import {AppState} from '../../store/typedef';
import {routes} from '../../routes/routes';

const apiUrl = 'http://localhost:5000';
const moduleName = 'places';

export const loadAll = createAsyncThunk(
    `${moduleName}/loadAll`,
    async (navPage: number | undefined, {rejectWithValue, getState}
    ) => {
        try {
            const {places: {page, findQuery}} = getState() as AppState;
            const loadPage: number = navPage || page || 0;

            let endpoint = `${apiUrl}/api/places?${loadPage ? `&offset=${loadPage}` : ''}`;
            findQuery.city.length && (endpoint += `&city=${findQuery.city}`);
            findQuery.name.length && (endpoint += `&name=${findQuery.name}`);

            const result = await fetch(endpoint, {
                method: 'GET',
                headers: setHeaders()
            });

            return {
                data: await result.json(),
                page: loadPage
            };
        } catch (e) {
            NotificationManager.error(e.message, 'Error', 3000);
            console.log(e);
            throw rejectWithValue(e);
        }
    });

export const findByParams = createAsyncThunk(
    `${moduleName}/findByParams`,
    async ({city, name}: { city: string, name: string }, {rejectWithValue}
    ) => {
        let url = `${apiUrl}/api/places?`;
        city && (url += `city=${city}&`);
        name && (url += `name=${name}& `);

        try {
            const result = await fetch(url, {
                method: 'GET',
                headers: setHeaders()
            });

            return await result.json();
        } catch (e) {
            NotificationManager.error(e.message, 'Error', 3000);
            console.log(e);
            throw rejectWithValue(e);
        }
    });

export const findById = createAsyncThunk(
    `${moduleName}/place`,
    async (id: string, {rejectWithValue}
    ) => {
        try {
            const result = await fetch(`${apiUrl}/api/places/${id}`, {
                method: 'GET',
                headers: setHeaders()
            });

            const data = await result.json();
            if (!result.ok) {
                return rejectWithValue(data);
            }

            return data;
        } catch (e) {
            NotificationManager.error(e.message, 'Error', 3000);
            console.log(e);
            return rejectWithValue(e);
        }
    });

export const createPlace = createAsyncThunk(
    `${moduleName}/create-place`,
    async (data: { form: PlaceInputInterface, navigate: NavigateFunction }, {rejectWithValue}
    ) => {
        try {
            const result = await fetch(`${apiUrl}/api/places`, {
                method: 'POST',
                headers: setHeaders(),
                body: JSON.stringify(data.form)
            });

            const place = await result.json();
            NotificationManager.info('Added successfully', 'Info', 3000);
            data.navigate(`${routes.places}/${place.id}`);

            return place;
        } catch (e) {
            NotificationManager.error(e.message, 'Error', 3000);
            console.log(e);
            throw rejectWithValue(e);
        }
    });

export const geocode = createAsyncThunk(
    `${moduleName}/geocode`,
    async ({lat, lon}: { lat: number, lon: number }
    ) => {
        const data = await fetch(`http://localhost:5000/api/places/coordinates/${lat}/${lon}`);
        return data.json();
    });

export const clearSearch = createAction(`${moduleName}/clear`, () => {
    localStorage.removeItem('city');
    localStorage.removeItem('name');
    return {
        payload: true
    };
});
export const clearAll = createAction('users/clear');
