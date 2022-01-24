import axios from 'axios';

const url =
    process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_BACKEND_URL_LOCAL
        : process.env.REACT_APP_BACKEND_URL;

const API = axios.create({
    baseURL: url,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

//auth routes
export const signIn = (formData: { email: string; password: string }) =>
    API.post('/auth/signin', formData);

export const signUp = (formData: {
    email: string;
    name: string;
    lastName: string;
    password: string;
}) => API.post('/auth/signup');

//user routes
export const getUser = API.get('/user/userData');
export const logout = API.delete('/user/logout');

//work routes
export const startTask = (formData: { taskId: string }) =>
    API.post('/work/startTask');

export const pauseTask = (formData: { taskId: string }) =>
    API.post('/work/pauseTask');

export const endTask = (formData: { taskId: string }) =>
    API.post('/work/endTask');

//admin routes
export const getTaskProgression = API.get('/admin/taskProgression');
