import axios from "axios";
import Cookies from 'js-cookie';

const axiosInstance = axios.create();

// Add an interceptor to set the token in the header before each request
axiosInstance.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    //console.log('Token:', token)
    if (token) {
        config.headers['token'] = `${token}`;
    }
    //console.log('Request Headers:', config.headers);
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
