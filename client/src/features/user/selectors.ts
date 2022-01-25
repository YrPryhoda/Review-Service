import {Selector} from '@reduxjs/toolkit';
import {AppState} from 'src/store/typedef';
import {UserState} from './reducers';

export const selectUser: Selector<AppState, UserState> = state => state.user;
