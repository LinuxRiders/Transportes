import { Router } from 'express';
import {
    createViaje,
    getAllViajes,
    getViaje,
    updateViaje,
    deleteViaje
} from '../controllers/viaje.controller.js';
import { validateResults } from '../../../middlewares/validationResult.js';
import { createViajeValidation, updateViajeValidation } from '../validations/viaje.validation.js';
import { idParamValidation, createdByValidation, updatedByValidation } from '../../../validations/validations.js';

const router = Router();

// Crear un viaje
router.post(
    '/',
    ...createViajeValidation, ...createdByValidation,
    validateResults,
    createViaje
);

// Obtener todos los viajes
router.get('/', getAllViajes);

// Obtener un viaje por ID
router.get(
    '/:id',
    idParamValidation,
    validateResults,
    getViaje
);

// Actualizar un viaje por ID
router.put(
    '/:id',
    ...idParamValidation, ...updateViajeValidation, ...updatedByValidation,
    validateResults,
    updateViaje
);

// Eliminar un viaje (borrado lógico)
router.delete(
    '/:id',
    ...idParamValidation, ...updatedByValidation,
    validateResults,
    deleteViaje
);

export default router;
