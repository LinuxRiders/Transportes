import { Router } from 'express';
import {
    createAsiento,
    updateAsiento,
    getAllAsientos,
    assignAsientosToVehicle,
    getAsiento,
    deleteAsiento,
    getAsientosToVehicle
} from '../controllers/asientos.controller.js';
import { validateResults } from '../../../middlewares/validationResult.js';
import { assignAsientosToVehicleValidation, createAsientoValidation, updateAsientoValidation } from '../validations/asientos.validation.js';
import { idParamValidation } from '../../../validations/validations.js';

const router = Router();

// Crear un asiento individual
router.post('/', createAsientoValidation, validateResults, createAsiento);
router.get('/', getAllAsientos);
router.get('/:id', idParamValidation, validateResults, getAsiento);
router.put('/:id', ...idParamValidation, ...updateAsientoValidation, validateResults, updateAsiento);
router.delete('/:id', idParamValidation, validateResults, deleteAsiento);

// Asignar varios asientos a un vehículo
router.get('/vehicle/:id', ...idParamValidation, validateResults, getAsientosToVehicle);
router.post('/vehicle/:id', ...idParamValidation, ...assignAsientosToVehicleValidation, validateResults, assignAsientosToVehicle);

export default router;
