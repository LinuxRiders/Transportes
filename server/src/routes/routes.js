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

import terminalRoutes from '../modules/Travels/routes/terminal.routes.js';
import viajeRoutes from '../modules/Travels/routes/viaje.routes.js';
import colaTerminalRoutes from '../modules/Travels/routes/colaTerminal.routes.js';
import ciudadRoutes from '../modules/Travels/routes/ciudad.routes.js';
import empresaRoutes from '../modules/Travels/routes/empresa.routes.js';

import searchRoutes from '../modules/Search/routes/search.routes.js';

import rutaRoutes from '../modules/Rutas/routes/ruta.routes.js';
import lugarTuristicoRoutes from '../modules/Rutas/routes/lugarTuristico.routes.js';
import categoriaLugarRoutes from '../modules/Rutas/routes/categoriaLugar.routes.js';
import rutaLugarRoutes from '../modules/Rutas/routes/rutaLugar.routes.js';

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

router.use('/ciudades', ciudadRoutes);
router.use('/empresas', empresaRoutes);
router.use('/terminales', terminalRoutes);
router.use('/viajes', viajeRoutes);
router.use('/colas-terminal', colaTerminalRoutes);
router.use('/search', searchRoutes);                 // /api/search


router.use('/rutas', rutaRoutes);                    // /api/rutas
router.use('/lugares-turisticos', lugarTuristicoRoutes); // /api/lugares-turisticos
router.use('/categorias-lugares', categoriaLugarRoutes); // /api/categorias-lugares
router.use('/rutas-lugares', rutaLugarRoutes); // /api/categorias-lugares

router.get('/ping', (req, res) => {
    res.send("Conexion Funcional");
})

export default router;