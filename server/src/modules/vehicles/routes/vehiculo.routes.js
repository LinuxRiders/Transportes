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

const router = Router();

router.post('/', createVehiculoValidation, validateResults, createVehiculo);
router.get('/', getAllVehiculos);
router.get('/:id', idParamValidation, validateResults, getVehiculo);
router.put('/:id', ...idParamValidation, ...updateVehiculoValidation, validateResults, updateVehiculo);
router.delete('/:id', ...idParamValidation, validateResults, deleteVehiculo);

export default router;
