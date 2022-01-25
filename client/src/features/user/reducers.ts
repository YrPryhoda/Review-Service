import {createReducer} from '@reduxjs/toolkit';
import {
    clearAll,
    deleteProfile,
    getProfile,
    getUserById,
    login,
    logout,
    register, signupConfirm,
    updateUser
} from './actions-creators';
import {UserInterface} from 'typedef';

const initialState = {
    profile: {} as UserInterface,
    loading: false,
    error: {},
    access_token: null
};

export const user = createReducer(initialState, builder => builder
    .addCase(login.fulfilled, (state, action) => {
        state.access_token = action.payload.access_token;
        state.profile = action.payload.profile;
        state.loading = false;
    })
    .addCase(login.rejected, (state, action) => {
        state.error = action.payload as Error;
        state.loading = false;
    })
    .addCase(login.pending, (state) => {
        state.loading = true;
    })
    .addCase(register.pending, (state) => {
        state.loading = true;
    })
    .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
    })
    .addCase(register.fulfilled, (state, action) => {
        if (!action.payload.id) {
            state.error = action.payload;
        }

        state.loading = false;
    })
    .addCase(signupConfirm.pending, (state) => {
        state.loading = true;
    })
    .addCase(signupConfirm.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = {};
    })
    .addCase(signupConfirm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
    })
    .addCase(getProfile.pending, (state) => {
        state.loading = true;
    })
    .addCase(logout.fulfilled, (state) => {
        state.profile = {} as UserInterface;
        state.access_token = null;
    })
    .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.profile;
        state.access_token = action.payload.access_token;
    })
    .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
        state.access_token = null;
    })
    .addCase(getUserById.pending, (state) => {
        state.loading = true;
    })
    .addCase(getUserById.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
    })
    .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
    })
    .addCase(updateUser.pending, (state) => {
        state.loading = true;
    })
    .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
    })
    .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
    })
    .addCase(deleteProfile.fulfilled, (state) => {
        state.loading = false;
        state.profile = {} as UserInterface;
        state.access_token = null;
    })
    .addCase(clearAll, () => {
    })
);

export type UserState = ReturnType<typeof user>
