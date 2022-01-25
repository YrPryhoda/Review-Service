import {createAsyncThunk} from '@reduxjs/toolkit';
import {NotificationManager} from 'react-notifications';

import {CommentEditInterface, CommentInputInterface, CommentInterface} from '../../../../typedef';
import {setHeaders} from '../../../helpers/setHeaders';
import {TokenService} from '../../../services/token-service';

const apiUrl = 'http://localhost:5000/api';
const moduleName = 'comments';

export const createComment = createAsyncThunk(
    `${moduleName}/create`,
    async (form: CommentInputInterface, {rejectWithValue}) => {
        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            if (typeof value !== 'object') {
                return formData.append(key, value);
            }

            if (value.length) {
                for (let i = 0; i < value.length; i++) {
                    formData.append('files', value[i]);
                }
            }
        });

        try {
            const response = await fetch(`${apiUrl}/comments`, {
                method: 'POST',
                body: formData,
                headers: setHeaders(false)
            });

            return await response.json();
        } catch (e) {
            NotificationManager.error(e.message, 'Error', 3000);
            console.log(e);
            throw rejectWithValue(e);
        }
    });

export const updateComment = createAsyncThunk(
    `${moduleName}/update`,
    async (form: CommentEditInterface, {rejectWithValue}) => {
        try {
            const {id, ...rest} = form;
            const response = await fetch(`${apiUrl}/comments/${id}`, {
                method: 'PUT',
                body: JSON.stringify(rest),
                headers: setHeaders()
            });

            const data = await response.json();

            if (!response.ok) {
                throw rejectWithValue(data);
            }

            return data as CommentInterface;
        } catch (e) {
            NotificationManager.error(e.message, 'Error', 3000);
            console.log(e);
            throw rejectWithValue(e);
        }
    }
);

export const removeComment = createAsyncThunk(
    `${moduleName}/remove`,
    async (commentId: string, {rejectWithValue}) => {
        try {
            const response = await fetch(`${apiUrl}/comments/${commentId}`, {
                method: 'DELETE',
                headers: setHeaders()
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data);
            }

            return data as CommentInterface;
        } catch (e) {
            NotificationManager.error(e.message, 'Error', 3000);
            console.log(e);
            throw rejectWithValue(e);
        }
    }
);
