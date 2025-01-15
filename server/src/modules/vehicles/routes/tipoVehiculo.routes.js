import { Router } from 'express';
import {
    createTipoVehiculo,
    updateTipoVehiculo,
    getAllTipoVehiculo,
    getTipoVehiculo,
    deleteTipoVehiculo
} from '../controllers/tipoVehiculo.controller.js';
import { createTipoVehiculoValidation, updateTipoVehiculoValidation } from '../validations/tipoVehiculo.validation.js';
import { validateResults } from '../../../middlewares/validationResult.js';
import { idParamValidation } from '../../../validations/validations.js';
import { authMiddleware } from '../../../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authMiddleware, createTipoVehiculoValidation, validateResults, createTipoVehiculo);
router.get('/', getAllTipoVehiculo);
router.get('/:id', authMiddleware, idParamValidation, validateResults, getTipoVehiculo);
router.put('/:id', authMiddleware, ...idParamValidation, ...updateTipoVehiculoValidation, validateResults, updateTipoVehiculo);
router.delete('/:id', authMiddleware, idParamValidation, validateResults, deleteTipoVehiculo);

export default router;
