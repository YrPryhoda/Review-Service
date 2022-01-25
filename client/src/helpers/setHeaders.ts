import {TokenService} from '../services/token-service';

interface IHeaders {
    [k: string]: string;
}

export const setHeaders = (isJSON = true) => {
    const token = TokenService.getToken();
    const headers: IHeaders = {
        'Authorization': token ? `Bearer ${token}` : ''
    };

    if (isJSON) {
        headers['Content-Type'] = 'application/json; charset=utf-8';
    }

    return headers;
};
