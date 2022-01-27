import {combineReducers, createReducer} from '@reduxjs/toolkit';

import {clearAll, clearSearch, createPlace, findById, findByParams, geocode, loadAll} from './actions-creators';
import {createCommentLike, createPlaceLike} from './like/action-creators';
import {createComment, removeComment, updateComment} from './comments/action-creators';
import {PlaceInterface} from '../../../typedef';

const initialState = {
    places: [] as PlaceInterface[],
    details: {} as PlaceInterface,
    geocoded: {} as PlaceInterface,
    page: Number(localStorage.getItem('page')) || 1,
    error: {} as Error,
    findQuery: {
        city: localStorage.getItem('city') || '',
        name: localStorage.getItem('name') || ''
    },
    loading: false
};

export const places = createReducer(initialState, builder => builder
    .addCase(loadAll.fulfilled, (state, action) => {
        state.loading = false;
        state.page = action.payload.page;
        state.places = action.payload.data.length ? action.payload.data : state.places;
    })
    .addCase(loadAll.pending, (state) => {
        state.loading = true;
    })
    .addCase(loadAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
    })
    .addCase(findByParams.pending, (state) => {
        state.loading = true;
    })
    .addCase(findByParams.fulfilled, (state, action) => {
        state.loading = false;
        state.places = action.payload;
        state.findQuery = action.meta.arg;
        state.page = 1;
    })
    .addCase(findByParams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
    })
    .addCase(findById.pending, (state) => {
        state.loading = true;
    })
    .addCase(findById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as Error;
    })
    .addCase(findById.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
        state.page = 0;
        state.error = {} as Error;
    })
    .addCase(geocode.fulfilled, (state, action) => {
        state.loading = false;
        state.geocoded = action.payload;
    })
    .addCase(geocode.pending, (state) => {
        state.loading = true;
    })
    .addCase(createComment.pending, (state) => {
        state.loading = true;
    })
    .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
    })
    .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
    })
    .addCase(updateComment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.details.comments?.findIndex(el => el.id === action.payload.id);
        state.details.comments![index!] = action.payload;
    })
    .addCase(removeComment.pending, (state) => {
        state.loading = true;
    })
    .addCase(removeComment.fulfilled, (state, action) => {
        state.loading = false;
        state.details.comments = state.details.comments?.filter(el => el.id !== action.payload.id);
    })
    .addCase(removeComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
    })
    .addCase(createPlace.fulfilled, (state) => {
        state.loading = false;
    })
    .addCase(createPlace.pending, (state) => {
        state.loading = true;
    })
    .addCase(createPlace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
    })
    .addCase(clearSearch, (state) => {
        state.findQuery = {city: '', name: ''};
        state.page = 1;
    })
    .addCase(createPlaceLike.fulfilled, (state, action) => {
        state.details.likes = action.payload;
    })
    .addCase(createPlaceLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
    })
    .addCase(createCommentLike.fulfilled, (state, action) => {
        state.details.comments![action.payload.commentId].likes = action.payload.likes;
    })
    .addCase(createCommentLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
    })
    .addCase(clearAll, () => {
    })
);

export type PlacesState = ReturnType<typeof places>
