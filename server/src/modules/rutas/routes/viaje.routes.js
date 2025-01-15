import { Router } from 'express';
import {
  createViaje,
  getAllViajes,
  getViaje,
  updateViaje,
  deleteViaje
} from '../controllers/viaje.controller.js';
import { validateResults } from '../../../middlewares/validationResult.js';
import { createViajeValidation, updateViajeValidation } from '../validations/viaje.validation.js';
import { idParamValidation, } from '../../../validations/validations.js';
import { authMiddleware } from '../../../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

// Crear un viaje
router.post(
  '/',
  createViajeValidation,
  validateResults,
  createViaje
);

// Obtener todos los viajes
router.get('/', getAllViajes);

// Obtener un viaje por ID
router.get(
  '/:id',
  idParamValidation,
  validateResults,
  getViaje
);

// Actualizar un viaje por ID
router.put(
  '/:id',
  ...idParamValidation, ...updateViajeValidation,
  validateResults,
  updateViaje
);

// Eliminar un viaje (borrado lógico)
router.delete(
  '/:id',
  idParamValidation,
  validateResults,
  deleteViaje
);

export default router;
