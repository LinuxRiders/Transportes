import { Router } from 'express';
import { createUser, getAllUsers, getUser, updateUser, deleteUser, getCurrentUser, getAllUsersWhitRoles } from '../controllers/user.controller.js';
import { assignConductorToUserValidation, assignGuiaToUserValidation, createFullUserValidation, createUserValidation } from '../validations/user.validation.js';
import { validateResults } from '../../../middlewares/validationResult.js';
import { authMiddleware } from '../../../middlewares/auth.middleware.js';
import { authorize } from '../../../middlewares/authorize.middleware.js';
import { assignConductorToUser, assignGuiaToUser, createFullUser } from '../controllers/userFull.controller.js';
import { idParamValidation } from '../../../validations/validations.js';

// Ejemplo: solo Admin puede ver todos los usuarios
// Admin crea usuarios, Staff o Admin pueden ver uno, etc.
const router = Router();


router.post('/full', createFullUserValidation, validateResults, createFullUser);
router.post('/assignGuia/:id', ...idParamValidation, ...assignGuiaToUserValidation, validateResults, assignGuiaToUser);
router.post('/assignConductor/:id', ...idParamValidation, ...assignConductorToUserValidation, validateResults, assignConductorToUser);

// Aplicar el middleware de autenticación a todas las rutas
router.use(authMiddleware);

router.get('/me', getCurrentUser);

// Listar Usuario con sus roles
router.get('/roles', authorize('Admin'), getAllUsersWhitRoles);

router.get('/', authorize('Admin'), getAllUsers);
router.post('/', authorize('Admin'), createUserValidation, validateResults, createUser);
router.get('/:id', authorize('Admin', 'Staff'), idParamValidation, validateResults, getUser);
router.patch('/:id', authorize('Admin'), idParamValidation, validateResults, updateUser);
router.delete('/:id', authorize('Admin'), idParamValidation, validateResults, deleteUser);



export default router;
