import { Router } from 'express';
import {
    createTerminal,
    getAllTerminales,
    getTerminal,
    updateTerminal,
    deleteTerminal
} from '../controllers/terminal.controller.js';
import { validateResults } from '../../../middlewares/validationResult.js';
import { createTerminalValidation, updateTerminalValidation } from '../validations/terminal.validation.js';
import { idParamValidation } from '../../../validations/validations.js';
import { authMiddleware } from '../../../middlewares/auth.middleware.js';

const router = Router();

// Crear una terminal
router.post(
    '/',
    authMiddleware,
    createTerminalValidation,
    validateResults,
    createTerminal
);

// Obtener todas las terminales
router.get('/', getAllTerminales);

// Obtener una terminal por ID
router.get(
    '/:id',
    authMiddleware,
    idParamValidation,
    validateResults,
    getTerminal
);

// Actualizar una terminal por ID
router.put(
    '/:id',
    authMiddleware,
    ...idParamValidation, ...updateTerminalValidation,
    validateResults,
    updateTerminal
);

// Eliminar una terminal (borrado lógico)
router.delete(
    '/:id',
    authMiddleware,
    idParamValidation,
    validateResults,
    deleteTerminal
);

export default router;
