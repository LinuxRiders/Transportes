import { Router } from 'express';
import { login, refresh, logout } from '../controllers/auth.controller.js';
import { loginValidation } from '../validations/auth.validation.js';
import { validateResults } from '../../../middlewares/validationResult.js';

const router = Router();

router.post('/login', loginValidation, validateResults, login);
router.post('/refresh', validateResults, refresh);
router.post('/logout', validateResults, logout);

export default router;
