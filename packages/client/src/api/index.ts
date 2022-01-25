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
    firstname: string;
    lastname: string;
    password: string;
}) => API.post('/auth/signup', formData);

//user routes
export const getUser = () => API.get('/user/userData');
export const logout = () => API.delete('/user/logout');

//work routes
export const startTask = (formData: { description: string }) =>
    API.post('/work/start', formData);

export const pauseTask = () => API.put('/work/pause');

export const endTask = () => API.post('/work/end');

export const userTaskProgression = () => API.get('/work/currentTask');

//admin routes
export const getTaskProgression = () => API.get('/admin/taskProgression');
