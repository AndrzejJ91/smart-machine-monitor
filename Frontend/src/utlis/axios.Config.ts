import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Interceptor do dodawania tokena do każdego żądania
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  //console.log("TOKEN Z LOCALSTORAGE:", token);  // LOG

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    //console.log("Token dodany do nagłówka:", config.headers.Authorization);  // LOG
  } else {
    console.warn("❗ Brak tokena w localStorage");
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;

