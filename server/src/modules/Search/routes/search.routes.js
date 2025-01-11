import { Router } from 'express';
import { search } from '../controllers/search.controller.js';
import { searchValidation } from '../validations/search.validation.js';
import { validateResults } from '../../../middlewares/validationResult.js';

const router = Router();

// Endpoint de búsqueda con validaciones
router.get('/search', searchValidation, validateResults, search);

export default router;
