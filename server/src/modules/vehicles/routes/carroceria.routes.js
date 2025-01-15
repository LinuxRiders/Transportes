import { Router } from 'express';
import {
    createCarroceria,
    updateCarroceria,
    getAllCarrocerias,
    getCarroceria,
    deleteCarroceria
} from '../controllers/carroceria.controller.js';
import { createCarroceriaValidation, updateCarroceriaValidation } from '../validations/carroceria.validation.js';
import { validateResults } from '../../../middlewares/validationResult.js';
import { idParamValidation } from '../../../validations/validations.js';
import { authMiddleware } from '../../../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authMiddleware, createCarroceriaValidation, validateResults, createCarroceria);
router.get('/', getAllCarrocerias);
router.get('/:id', authMiddleware, idParamValidation, validateResults, getCarroceria);
router.put('/:id', authMiddleware, ...idParamValidation, ...updateCarroceriaValidation, validateResults, updateCarroceria);
router.delete('/:id', authMiddleware, idParamValidation, validateResults, deleteCarroceria);

export default router;
