import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import ProfileLoader from '../components/common/ProfileLoader';
import PrivateRoute from '../components/common/PrivateRoute';
import PublicRoute from '../components/common/PublicRoute';
import AccountConfirm from '../pages/AccountConfirm';
import PlaceDetails from '../pages/PlaceDetails';
import CreatePlace from '../pages/CreatePlace';
import NotFound from '../pages/NotFound';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import Main from '../pages/Main';
import {routes} from './routes';
import RegisterFinish from '../pages/RegisterFinish';
import AdminRoutes from '../components/common/AdminRoutes';
import PlaceRequests from '../pages/PlaceRequests';

export const Router = () => {
    return <BrowserRouter>
        <Routes>
            <Route element={<PrivateRoute/>}>
                <Route path={routes.profile} element={<Profile/>}/>
                <Route path={routes.createPlace} element={<CreatePlace/>}/>
            </Route>

            <Route element={<PublicRoute/>}>
                <Route path={routes.accountConfirm} element={<AccountConfirm/>}/>
                <Route path={routes.login} element={<Login/>}/>
                <Route path={routes.register} element={<Register/>}/>
                <Route path={routes.registerFinish} element={<RegisterFinish/>}/>
            </Route>

            <Route element={<AdminRoutes/>}>
                <Route path={routes.placeRequests} element={<PlaceRequests/>}/>
            </Route>

            <Route element={<ProfileLoader/>}>
                <Route path={routes.home} element={<Main/>}/>
                <Route path={routes.placeDetails} element={<PlaceDetails/>}/>
                <Route path={routes.notFound} element={<NotFound/>}/>
            </Route>
        </Routes>
    </BrowserRouter>;
};
