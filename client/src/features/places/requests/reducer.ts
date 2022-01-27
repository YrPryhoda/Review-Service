import {createReducer} from '@reduxjs/toolkit';
import {PlaceChangeRequestInterface} from '../../../../typedef';
import {approvePlaceRequest, createPlaceRequest, getRequests, rejectPlaceRequest} from './action-creators';

const initialState = {
    details: {} as PlaceChangeRequestInterface,
    error: {} as Error,
    loading: false,
    all: [] as PlaceChangeRequestInterface[]
};

export const requests = createReducer(initialState, builder => builder
    .addCase(getRequests.pending, (state) => {
        state.loading = true;
    })
    .addCase(getRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
    })
    .addCase(getRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.error = {} as Error;
        state.all = action.payload;
    })
    .addCase(createPlaceRequest.pending, (state) => {
        state.loading = true;
    })
    .addCase(createPlaceRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
    })
    .addCase(rejectPlaceRequest.pending, (state) => {
        state.loading = true;
    })
    .addCase(rejectPlaceRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.all = state.all.filter(el => el.id !== action.payload.id)
    })
    .addCase(rejectPlaceRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
    })
);

export type RequestsState = ReturnType<typeof requests>
