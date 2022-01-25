import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {NotificationContainer} from 'react-notifications';

import 'react-notifications/lib/notifications.css';
import {store} from './store/store';
import {Router} from './routes';
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <NotificationContainer/>
            <Router/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
