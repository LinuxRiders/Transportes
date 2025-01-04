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

const router = Router();

router.post('/', createMarcaVehiculoValidation, validateResults, createMarcaVehiculo);
router.get('/', getAllMarcaVehiculo);
router.get('/:id', idParamValidation, validateResults, getMarcaVehiculo);
router.put('/:id', ...idParamValidation, ...updateMarcaVehiculoValidation, validateResults, updateMarcaVehiculo);
router.delete('/:id', idParamValidation, validateResults, deleteMarcaVehiculo);

export default router;
