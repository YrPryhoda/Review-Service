import {Selector} from '@reduxjs/toolkit';
import {AppState} from '../../../store/typedef';
import {RequestsState} from './reducer';

export const selectRequests: Selector<AppState, RequestsState> = state => state.requests;
