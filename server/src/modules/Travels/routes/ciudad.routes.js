import { Router } from 'express';
import {
    createCiudad,
    getAllCiudades,
    getCiudad,
    updateCiudad,
    deleteCiudad
} from '../controllers/ciudad.controller.js';
import { validateResults } from '../../../middlewares/validationResult.js';
import { createCiudadValidation, updateCiudadValidation } from '../validations/ciudad.validation.js';
import { idParamValidation } from '../../../validations/validations.js';
import { authMiddleware } from '../../../middlewares/auth.middleware.js';

const router = Router();


// Crear una ciudad
router.post(
    '/',
    authMiddleware,
    createCiudadValidation,
    validateResults,
    createCiudad
);

// Obtener todas las ciudades
router.get('/', getAllCiudades);

// Obtener una ciudad por ID
router.get(
    '/:id',
    authMiddleware,
    idParamValidation,
    validateResults,
    getCiudad
);

// Actualizar una ciudad por ID
router.put(
    '/:id',
    authMiddleware,
    ...idParamValidation, ...updateCiudadValidation,
    validateResults,
    updateCiudad
);

// Eliminar una ciudad (borrado lógico)
router.delete(
    '/:id',
    authMiddleware,
    idParamValidation,
    validateResults,
    deleteCiudad
);

export default router;
