import {createAsyncThunk} from '@reduxjs/toolkit';
import {NotificationManager} from 'react-notifications';

import {setHeaders} from '../../../helpers/setHeaders';
import {AppState} from '../../../store/typedef';
import {LikeInterface} from '../../../../typedef';

const apiUrl = 'http://localhost:5000/api';
const moduleName = 'likes';

export const createPlaceLike = createAsyncThunk(
    `${moduleName}/place`,
    async (placeId: { placeId: string }, {rejectWithValue}
    ) => {
        try {
            const response = await fetch(`${apiUrl}/places/like`, {
                method: 'POST',
                body: JSON.stringify(placeId),
                headers: setHeaders()
            });
            const data = await response.json();

            if (!response.ok) {
                throw rejectWithValue(data);
            }

            return data;
        } catch (e) {
            NotificationManager.error(e.message, 'Error', 3000);
            console.log(e);
            throw rejectWithValue(e);
        }
    });

export const createCommentLike = createAsyncThunk(
    `${moduleName}/comment`,
    async (id: { commentId: string }, {rejectWithValue, getState, fulfillWithValue}) => {
        try {
            const response = await fetch(`${apiUrl}/comments/like`, {
                method: 'POST',
                body: JSON.stringify(id),
                headers: setHeaders()
            });
            const data = await response.json();

            if (!response.ok) {
                throw rejectWithValue(data);
            }

            //@ts-ignore-next-line
            const {places} = getState() as AppState;
            //@ts-ignore-next-line
            const commentId: number = places.details.comments?.findIndex(el => el.id === id.commentId)

            return {
                likes: data as LikeInterface[],
                commentId
            };
        } catch (e) {
            NotificationManager.error(e.message, 'Error', 3000);
            console.log(e);
            throw rejectWithValue(e);
        }
    });
