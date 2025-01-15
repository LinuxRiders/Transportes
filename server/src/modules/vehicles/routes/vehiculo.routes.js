import { Router } from 'express';
import {
    createVehiculo,
    updateVehiculo,
    getAllVehiculos,
    getVehiculo,
    deleteVehiculo
} from '../controllers/vehiculo.controller.js';
import { createVehiculoValidation, updateVehiculoValidation } from '../validations/vehiculo.validation.js';
import { validateResults } from '../../../middlewares/validationResult.js';
import { idParamValidation } from '../../../validations/validations.js';
import { authMiddleware } from '../../../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authMiddleware, createVehiculoValidation, validateResults, createVehiculo);
router.get('/', getAllVehiculos);
router.get('/:id', authMiddleware, idParamValidation, validateResults, getVehiculo);
router.put('/:id', authMiddleware, ...idParamValidation, ...updateVehiculoValidation, validateResults, updateVehiculo);
router.delete('/:id', authMiddleware, idParamValidation, validateResults, deleteVehiculo);

export default router;