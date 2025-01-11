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
import { idParamValidation, createdByValidation, updatedByValidation } from '../../../validations/validations.js';

const router = Router();

// Crear una terminal
router.post(
    '/',
    ...createTerminalValidation, ...createdByValidation,
    validateResults,
    createTerminal
);

// Obtener todas las terminales
router.get('/', getAllTerminales);

// Obtener una terminal por ID
router.get(
    '/:id',
    idParamValidation,
    validateResults,
    getTerminal
);

// Actualizar una terminal por ID
router.put(
    '/:id',
    ...idParamValidation, ...updateTerminalValidation, ...updatedByValidation,
    validateResults,
    updateTerminal
);

// Eliminar una terminal (borrado lógico)
router.delete(
    '/:id',
    ...idParamValidation, ...updatedByValidation,
    validateResults,
    deleteTerminal
);

export default router;
