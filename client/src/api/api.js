import axios from 'axios';

const BASE_URL = import.meta.env.VITE_SERVER;

// Variable para almacenar el accessToken
let accessToken = null;

// Función para actualizar el accessToken
export const setAccessToken = (token) => {
    accessToken = token;
};

// Crear la instancia de Axios
const api = axios.create({
    baseURL: `${BASE_URL}/api`,
    withCredentials: true // Necesario para enviar cookies HttpOnly
});

// Interceptor para agregar el access token
api.interceptors.request.use(
    (config) => {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);



export default api;
