import { Router } from 'express';
import {
    createTransmision,
    updateTransmision,
    getAllTransmisiones,
    getTransmision,
    deleteTransmision
} from '../controllers/transmision.controller.js';
import { validateResults } from '../../../middlewares/validationResult.js';
import { createTransmisionValidation, updateTransmisionValidation } from '../validations/transmision.validation.js';
import { idParamValidation } from '../../../validations/validations.js';
import { authMiddleware } from '../../../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authMiddleware, createTransmisionValidation, validateResults, createTransmision);
router.get('/', getAllTransmisiones);
router.get('/:id', authMiddleware, idParamValidation, validateResults, getTransmision);
router.put('/:id', authMiddleware, ...idParamValidation, ...updateTransmisionValidation, validateResults, updateTransmision);
router.delete('/:id', authMiddleware, idParamValidation, validateResults, deleteTransmision);



export default router;
