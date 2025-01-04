import { Router } from 'express';
import {
    createCombustible,
    updateCombustible,
    getAllCombustibles,
    getCombustible,
    deleteCombustible
} from '../controllers/combustible.controller.js';
import { createCombustibleValidation, updateCombustibleValidation } from '../validations/combustible.validation.js';
import { validateResults } from '../../../middlewares/validationResult.js';
import { idParamValidation } from '../../../validations/validations.js';

const router = Router();

router.post('/', createCombustibleValidation, validateResults, createCombustible);
router.get('/con', getAllCombustibles);
router.get('/:id', idParamValidation, validateResults, getCombustible);
router.put('/:id', ...idParamValidation, ...updateCombustibleValidation, validateResults, updateCombustible);
router.delete('/:id', idParamValidation, validateResults, deleteCombustible);

export default router;
