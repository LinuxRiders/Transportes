import { Router } from 'express';
import {
    createMarcaVehiculo,
    getAllMarcaVehiculo,
    getMarcaVehiculo,
    updateMarcaVehiculo,
    deleteMarcaVehiculo
} from '../controllers/marcaVehiculo.controller.js';
import { validateResults } from '../../../middlewares/validationResult.js';
import { createMarcaVehiculoValidation, updateMarcaVehiculoValidation } from '../validations/marcaVehiculo.validation.js';
import { idParamValidation } from '../../../validations/validations.js';
import { authMiddleware } from '../../../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authMiddleware, createMarcaVehiculoValidation, validateResults, createMarcaVehiculo);
router.get('/', getAllMarcaVehiculo);
router.get('/:id', authMiddleware, idParamValidation, validateResults, getMarcaVehiculo);
router.put('/:id', authMiddleware, ...idParamValidation, ...updateMarcaVehiculoValidation, validateResults, updateMarcaVehiculo);
router.delete('/:id', authMiddleware, idParamValidation, validateResults, deleteMarcaVehiculo);

export default router;
