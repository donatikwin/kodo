
import axios from 'axios';
import AuthService from '../service/AuthService';

export const API_URL = "http://localhost:5000/api";

const API = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await AuthService.refresh();
        const newToken = res.data.accessToken;
        localStorage.setItem('token', newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('token');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
