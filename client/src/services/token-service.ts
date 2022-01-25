export class TokenService {
    static getToken = () => {
        return localStorage.getItem('access_token');
    };

    static setToken = (token: string) => {
        return localStorage.setItem('access_token', token);
    };

    static removeToken = () => {
        return localStorage.removeItem('access_token');
    }
}
