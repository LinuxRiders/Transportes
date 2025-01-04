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

const router = Router();

router.post('/', createTipoVehiculoValidation, validateResults, createTipoVehiculo);
router.get('/', getAllTipoVehiculo);
router.get('/:id', idParamValidation, validateResults, getTipoVehiculo);
router.put('/:id', ...idParamValidation, ...updateTipoVehiculoValidation, validateResults, updateTipoVehiculo);
router.delete('/:id', idParamValidation, validateResults, deleteTipoVehiculo);

export default router;
