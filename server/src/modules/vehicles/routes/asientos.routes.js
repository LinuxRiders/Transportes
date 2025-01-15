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
import { authMiddleware } from '../../../middlewares/auth.middleware.js';

const router = Router();

// Crear un asiento individual
router.post('/', authMiddleware, createAsientoValidation, validateResults, createAsiento);
router.get('/', getAllAsientos);
router.get('/:id', authMiddleware, idParamValidation, validateResults, getAsiento);
router.put('/:id', authMiddleware, ...idParamValidation, ...updateAsientoValidation, validateResults, updateAsiento);
router.delete('/:id', authMiddleware, idParamValidation, validateResults, deleteAsiento);

// Asignar varios asientos a un vehículo
router.get('/vehicle/:id', authMiddleware, ...idParamValidation, validateResults, getAsientosToVehicle);
router.post('/vehicle/:id', authMiddleware, ...idParamValidation, ...assignAsientosToVehicleValidation, validateResults, assignAsientosToVehicle);

export default router;
