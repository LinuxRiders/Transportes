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

const router = Router();

router.post('/', createCarroceriaValidation, validateResults, createCarroceria);
router.get('/', getAllCarrocerias);
router.get('/:id', idParamValidation, validateResults, getCarroceria);
router.put('/:id', ...idParamValidation, ...updateCarroceriaValidation, validateResults, updateCarroceria);
router.delete('/:id', idParamValidation, validateResults, deleteCarroceria);

export default router;
