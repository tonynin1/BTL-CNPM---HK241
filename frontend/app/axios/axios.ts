import axios, { AxiosRequestConfig } from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:8080',
});

export const get = async (path: string, options: AxiosRequestConfig = {}) => {
    const api = await request.get(path, options);
    return api.data;
};

export const post = async (path: string, data = {}, options: AxiosRequestConfig = {}) => {
    const api = await request.post(path, data, {
        ...options,
        headers: {
            ...options.headers, // Ensure headers are merged
        },
    });
    return api.data;
};

export const put = async (path: string, data = {}, options: AxiosRequestConfig = {}) => {
    const api = await request.put(path, data, {
        ...options,
        headers: {
            ...options.headers,
        },
    });
    return api.data;
};

export const del = async (path: string, options: AxiosRequestConfig = {}) => {
    const api = await request.delete(path, {
        ...options,
        headers: {
            ...options.headers,
        },
    });
    return api.data;
};

export const patch = async (path: string, data = {}, options: AxiosRequestConfig = {}) => {
    const api = await request.patch(path, data, {
        ...options,
        headers: {
            ...options.headers,
        },
    });
    return api.data;
};

export default request;
