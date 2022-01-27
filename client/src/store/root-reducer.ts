import {combineReducers} from '@reduxjs/toolkit';

import {requests} from '../features/places/requests/reducer';
import {places} from '../features/places/reducers';
import {user} from '../features/user/reducers';

export const rootReducer = combineReducers({
    user: user,
    places: places,
    requests: requests
});
