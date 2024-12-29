import { Router } from 'express';


import marcaVehiculoRoutes from './marcaVehiculo.routes.js';
import transmisionRoutes from './transmision.routes.js';
import carroceriaRoutes from './carroceria.routes.js';
import tipoVehiculoRoutes from './tipoVehiculo.routes.js';
import combustibleRoutes from './combustible.routes.js';
import vehiculoRoutes from './vehiculo.routes.js';
import asientosRoutes from './asientos.routes.js';

const router = Router();

// Montar cada grupo de rutas en su endpoint base
router.use('/marcas', marcaVehiculoRoutes);          // /api/marcas
router.use('/transmisiones', transmisionRoutes);     // /api/transmisiones
router.use('/carrocerias', carroceriaRoutes);        // /api/carrocerias
router.use('/tipos-vehiculo', tipoVehiculoRoutes);   // /api/tipos-vehiculo
router.use('/combustibles', combustibleRoutes);      // /api/combustibles
router.use('/vehiculos', vehiculoRoutes);            // /api/vehiculos
router.use('/asientos', asientosRoutes);             // /api/asientos


router.get('/ping', (req, res) => {
    res.send("Conexion Funcional");
})

export default router;