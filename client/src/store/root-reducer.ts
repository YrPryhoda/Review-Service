import {places} from '../features/places/reducers';
import {combineReducers} from '@reduxjs/toolkit';
import {user} from '../features/user/reducers';

export const rootReducer = combineReducers({
    user: user,
    places: places
});
