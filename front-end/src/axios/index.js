import axios from 'axios';

require('dotenv').config();

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  try {
    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  } catch (err) {
    console.log('err', err);
  }
});

export default api;
