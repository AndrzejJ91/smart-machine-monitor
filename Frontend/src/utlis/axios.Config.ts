import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Interceptor do dodawania tokena do każdego żądania
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  //console.log("🔥 Token przed dodaniem do nagłówka:", token);

  // Jeśli jest to żądanie logowania, nie dodawaj tokena
  if (config.url?.includes('/login')) {
   // console.log("🚫 Logowanie - nie dodajemy tokena");
    return config;
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
   // console.log("✅ Token dodany do nagłówka:", config.headers.Authorization);
  } else {
    console.warn("❗ Brak tokena w localStorage");
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor odpowiedzi - obsługa błędów autoryzacji
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("❗ Token jest nieważny lub wygasł, wylogowywanie...");
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;

