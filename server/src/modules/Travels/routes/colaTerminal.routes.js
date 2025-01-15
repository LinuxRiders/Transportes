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
import { idParamValidation } from '../../../validations/validations.js';
import { authMiddleware } from '../../../middlewares/auth.middleware.js';

const router = Router();

// Crear una cola
router.post(
    '/',
    authMiddleware,
    createColaValidation,
    validateResults,
    createCola
);

// Obtener todas las colas
router.get('/', getAllColas);

// Obtener una cola por ID
router.get(
    '/:id',
    authMiddleware,
    idParamValidation,
    validateResults,
    getCola
);

// Actualizar una cola por ID
router.put(
    '/:id',
    authMiddleware,
    ...idParamValidation, ...updateColaValidation,
    validateResults,
    updateCola
);

// Eliminar una cola (borrado lógico)
router.delete(
    '/:id',
    authMiddleware,
    idParamValidation,
    validateResults,
    deleteCola
);

export default router;
