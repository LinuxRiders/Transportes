import { Router } from 'express';
import {
    createEmpresa,
    getAllEmpresas,
    getEmpresa,
    updateEmpresa,
    deleteEmpresa
} from '../controllers/empresa.controller.js';
import { validateResults } from '../../../middlewares/validationResult.js';
import { createEmpresaValidation, updateEmpresaValidation } from '../validations/empresa.validation.js';
import { idParamValidation } from '../../../validations/validations.js';
import { authMiddleware } from '../../../middlewares/auth.middleware.js';

const router = Router();

// Crear una empresa
router.post(
    '/',
    authMiddleware,
    createEmpresaValidation,
    validateResults,
    createEmpresa
);

// Obtener todas las empresas
router.get('/', getAllEmpresas);

// Obtener una empresa por ID
router.get(
    '/:id',
    authMiddleware,
    idParamValidation,
    validateResults,
    getEmpresa
);

// Actualizar una empresa por ID
router.put(
    '/:id',
    authMiddleware,
    ...idParamValidation, ...updateEmpresaValidation,
    validateResults,
    updateEmpresa
);

// Eliminar una empresa (borrado lógico)
router.delete(
    '/:id',
    authMiddleware,
    idParamValidation,
    validateResults,
    deleteEmpresa
);

export default router;
