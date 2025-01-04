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

const router = Router();

router.post('/', createTransmisionValidation, validateResults, createTransmision);
router.get('/', getAllTransmisiones);
router.get('/:id', idParamValidation, validateResults, getTransmision);
router.put('/:id', ...idParamValidation, ...updateTransmisionValidation, validateResults, updateTransmision);
router.delete('/:id', idParamValidation, validateResults, deleteTransmision);



export default router;
