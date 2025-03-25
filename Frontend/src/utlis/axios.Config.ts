import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Interceptor to add token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  //console.log("🔥 Token before adding to header:", token);

  // If it is a login request, do not add the token
  if (config.url?.includes('/login')) {
    // console.log("🚫 Login request - not adding token");
    return config;
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    // console.log("✅ Token added to header:", config.headers.Authorization);
  } else {
    console.warn("❗ No token found in localStorage");
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor - handling authorization errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("❗ Token is invalid or expired, logging out...");
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;

