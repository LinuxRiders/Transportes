import { Router } from 'express';
import { createRole, getAllRoles, getRole, updateRole, deleteRole } from '../controllers/role.controller.js';
import { validateResults } from '../../../middlewares/validationResult.js';
import { createRoleValidation, roleIdParamValidation } from '../validations/role.validation.js';
import { authMiddleware } from '../../../middlewares/auth.middleware.js';
import { authorize } from '../../../middlewares/authorize.middleware.js';

const router = Router();

// Solo Admin gestiona roles
router.use(authMiddleware, authorize('Admin'));

router.get('/', getAllRoles);
router.post('/', createRoleValidation, validateResults, createRole);
router.get('/:id', roleIdParamValidation, validateResults, getRole);
router.patch('/:id', roleIdParamValidation, validateResults, updateRole);
router.delete('/:id', roleIdParamValidation, validateResults, deleteRole);

export default router;
