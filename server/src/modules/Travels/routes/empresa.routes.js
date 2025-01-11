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
import { idParamValidation, createdByValidation, updatedByValidation } from '../../../validations/validations.js';

const router = Router();

// Crear una empresa
router.post(
    '/',
    ...createEmpresaValidation, ...createdByValidation,
    validateResults,
    createEmpresa
);

// Obtener todas las empresas
router.get('/', getAllEmpresas);

// Obtener una empresa por ID
router.get(
    '/:id',
    idParamValidation,
    validateResults,
    getEmpresa
);

// Actualizar una empresa por ID
router.put(
    '/:id',
    ...idParamValidation, ...updateEmpresaValidation, ...updatedByValidation,
    validateResults,
    updateEmpresa
);

// Eliminar una empresa (borrado lógico)
router.delete(
    '/:id',
    ...idParamValidation, ...updatedByValidation,
    validateResults,
    deleteEmpresa
);

export default router;
