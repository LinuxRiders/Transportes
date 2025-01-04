import { Router } from 'express';
import { assignRoleToUser, removeRoleFromUser, getUserRoles } from '../controllers/userRole.controller.js';
import { validateResults } from '../../../middlewares/validationResult.js';
import { assignRoleValidation, userParamValidation } from '../validations/userRole.validation.js';
import { authMiddleware } from '../../../middlewares/auth.middleware.js';
import { authorize } from '../../../middlewares/authorize.middleware.js';

// Solo Admin asigna y elimina roles de usuarios
const router = Router();

router.use(authMiddleware, authorize('Admin'));

router.post('/assign', assignRoleValidation, validateResults, assignRoleToUser);
router.post('/remove', assignRoleValidation, validateResults, removeRoleFromUser);
router.get('/user/:user_id', userParamValidation, validateResults, getUserRoles);

export default router;
