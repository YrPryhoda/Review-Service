import {Selector} from '@reduxjs/toolkit';
import {AppState} from 'src/store/typedef';
import {PlacesState} from './reducers';

export const selectPlaces: Selector<AppState, PlacesState> = state => state.places;
