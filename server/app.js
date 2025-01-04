// app.js
import express from "express";
import cors from 'cors';
import 'dotenv/config';
import routes from './src/routes/routes.js';

const PORT = process.env.PORT || 4000;

const app = express();

// Configuración dinámica de CORS
const corsOptions = {
    origin: (origin, callback) => {
        if (origin) {
            callback(null, origin); // Permite cualquier origen
        } else {
            callback(null, '*'); // Permite solicitudes sin origen (como Postman)
        }
    },
    credentials: true, // Permitir credenciales (cookies, encabezados, etc.)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Usa el router en el prefijo /api
app.use('/api/', routes); // Rutas generales

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
