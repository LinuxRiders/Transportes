import { Router } from 'express';


import marcaVehiculoRoutes from '../modules/vehicles/routes/marcaVehiculo.routes.js';
import transmisionRoutes from '../modules/vehicles/routes/transmision.routes.js';
import carroceriaRoutes from '../modules/vehicles/routes/carroceria.routes.js';
import tipoVehiculoRoutes from '../modules/vehicles/routes/tipoVehiculo.routes.js';
import combustibleRoutes from '../modules/vehicles/routes/combustible.routes.js';
import vehiculoRoutes from '../modules/vehicles/routes/vehiculo.routes.js';
import asientosRoutes from '../modules/vehicles/routes/asientos.routes.js';

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