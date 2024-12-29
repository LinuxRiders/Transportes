import { Router } from 'express';
import {
    createAsiento,
    showAsiento,
    updateAsiento,
    softDeleteAsiento,
    getAllAsientos,
    assignAsientosToVehicle
} from '../controllers/asientos.controller.js';

const router = Router();

// Crear un asiento individual
router.post('/', createAsiento);
// Asignar varios asientos a un vehículo
router.post('/assign', assignAsientosToVehicle);

router.get('/', getAllAsientos);
router.get('/:id', showAsiento);
router.put('/:id', updateAsiento);
router.delete('/:id', softDeleteAsiento);

export default router;
