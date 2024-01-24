import axios from 'axios';
import handle_token_local from './handle_token';

const api_user = axios.create({ baseURL: `${process.env.REACT_APP_API}` });
api_user.interceptors.request.use(
    async (config) => {
        let token = await handle_token_local(process.env.REACT_APP_LOCALHOST_ACOUNT_USER);
        if (token) { config.headers.Authorization = `Bearer ${token}`; }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
api_user.interceptors.response.use(
    (response) => { return response; },
    async (error) => {
        if (error.response.status === 401) {
            await handle_token_local(process.env.REACT_APP_LOCALHOST_ACOUNT_USER);
        }
        return Promise.reject(error);
    }
);

export default api_user;
