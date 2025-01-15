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
import { authMiddleware } from '../../../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authMiddleware, createCombustibleValidation, validateResults, createCombustible);
router.get('/con', getAllCombustibles);
router.get('/:id', authMiddleware, idParamValidation, validateResults, getCombustible);
router.put('/:id', authMiddleware, ...idParamValidation, ...updateCombustibleValidation, validateResults, updateCombustible);
router.delete('/:id', authMiddleware, idParamValidation, validateResults, deleteCombustible);

export default router;
