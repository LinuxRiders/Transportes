import { Router } from 'express';

import authRoutes from '../modules/Users-Auth/routes/auth.routes.js';
import userRoutes from '../modules/Users-Auth/routes/user.routes.js';
import roleRoutes from '../modules/Users-Auth/routes/role.routes.js';
import userRoleRoutes from '../modules/Users-Auth/routes/userRole.routes.js';

import marcaVehiculoRoutes from '../modules/vehicles/routes/marcaVehiculo.routes.js';
import transmisionRoutes from '../modules/vehicles/routes/transmision.routes.js';
import carroceriaRoutes from '../modules/vehicles/routes/carroceria.routes.js';
import tipoVehiculoRoutes from '../modules/vehicles/routes/tipoVehiculo.routes.js';
import combustibleRoutes from '../modules/vehicles/routes/combustible.routes.js';
import vehiculoRoutes from '../modules/vehicles/routes/vehiculo.routes.js';
import asientosRoutes from '../modules/vehicles/routes/asientos.routes.js';

const router = Router();

// ============== Montar rutas de Users & Auth ==============
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/roles', roleRoutes);
router.use('/user-roles', userRoleRoutes);


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