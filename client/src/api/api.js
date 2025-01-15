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

// Interceptor para manejar respuestas con error 401 (Access Token expirado)
api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refresh_token'); // Si está almacenado en localStorage
            if (refreshToken) {
                try {
                    const { data } = await axios.post(`${BASE_URL}/api/auth/refresh`, { refresh_token: refreshToken });
                    const newAccessToken = data.access_token;
                    const newRefreshToken = data.refresh_token;

                    // Actualizar los tokens en el almacenamiento
                    accessToken = newAccessToken;
                    localStorage.setItem('refresh_token', newRefreshToken);

                    // Reintentar la petición original con el nuevo access token
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axios(originalRequest);
                } catch (refreshError) {
                    // Si no se pudo refrescar, desloguear al usuario
                    accessToken = null;
                    localStorage.removeItem('refresh_token');
                    // window.location.href = '/login'; // Redirigir a login
                    console.log("Error API refresh");
                    return Promise.reject(refreshError);
                }
            } else {
                // Sin refresh token, redirigir a login
                // window.location.href = '/login';
                console.log("Sin Refresh Token API");
            }
        }
        return Promise.reject(error);
    }
);

export default api;

