import { Router } from 'express';
import { createUser, getAllUsers, getUser, updateUser, deleteUser, getCurrentUser } from '../controllers/user.controller.js';
import { createFullUserValidation, createUserValidation, userIdParamValidation } from '../validations/user.validation.js';
import { validateResults } from '../../../middlewares/validationResult.js';
import { authMiddleware } from '../../../middlewares/auth.middleware.js';
import { authorize } from '../../../middlewares/authorize.middleware.js';
import { createFullUser } from '../controllers/userFull.controller.js';

// Ejemplo: solo Admin puede ver todos los usuarios
// Admin crea usuarios, Staff o Admin pueden ver uno, etc.
const router = Router();

// Aplicar el middleware de autenticación a todas las rutas
router.use(authMiddleware);

router.get('/me', getCurrentUser);

router.get('/', authorize('Admin'), getAllUsers);
router.post('/', authorize('Admin'), createUserValidation, validateResults, createUser);
router.get('/:id', authorize('Admin', 'Staff'), userIdParamValidation, validateResults, getUser);
router.patch('/:id', authorize('Admin'), userIdParamValidation, validateResults, updateUser);
router.delete('/:id', authorize('Admin'), userIdParamValidation, validateResults, deleteUser);

router.post('/full', authorize('Admin'), createFullUserValidation, validateResults, createFullUser);


export default router;
