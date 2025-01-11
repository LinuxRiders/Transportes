import { Router } from 'express';
import {
    createCola,
    getAllColas,
    getCola,
    updateCola,
    deleteCola
} from '../controllers/colaTerminal.controller.js';
import { validateResults } from '../../../middlewares/validationResult.js';
import { createColaValidation, updateColaValidation } from '../validations/colaTerminal.validation.js';
import { idParamValidation, createdByValidation, updatedByValidation } from '../../../validations/validations.js';

const router = Router();

// Crear una cola
router.post(
    '/',
    ...createColaValidation, ...createdByValidation,
    validateResults,
    createCola
);

// Obtener todas las colas
router.get('/', getAllColas);

// Obtener una cola por ID
router.get(
    '/:id',
    idParamValidation,
    validateResults,
    getCola
);

// Actualizar una cola por ID
router.put(
    '/:id',
    ...idParamValidation, ...updateColaValidation, ...updatedByValidation,
    validateResults,
    updateCola
);

// Eliminar una cola (borrado lógico)
router.delete(
    '/:id',
    ...idParamValidation, ...updatedByValidation,
    validateResults,
    deleteCola
);

export default router;
