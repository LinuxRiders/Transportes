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
import { idParamValidation, createdByValidation, updatedByValidation } from '../../../validations/validations.js';

const router = Router();

// Crear una ciudad
router.post(
    '/',
    ...createCiudadValidation, ...createdByValidation,
    validateResults,
    createCiudad
);

// Obtener todas las ciudades
router.get('/', getAllCiudades);

// Obtener una ciudad por ID
router.get(
    '/:id',
    idParamValidation,
    validateResults,
    getCiudad
);

// Actualizar una ciudad por ID
router.put(
    '/:id',
    ...idParamValidation, ...updateCiudadValidation, ...updatedByValidation,
    validateResults,
    updateCiudad
);

// Eliminar una ciudad (borrado lógico)
router.delete(
    '/:id',
    ...idParamValidation, ...updatedByValidation,
    validateResults,
    deleteCiudad
);

export default router;
