import { Router } from 'express';
import {
  createRuta,
  getAllRutas,
  getRuta,
  updateRuta,
  deleteRuta
} from '../controllers/ruta.controller.js';
import { validateResults } from '../../../middlewares/validationResult.js';
import { createRutaValidation, updateRutaValidation } from '../validations/ruta.validation.js';
import { idParamValidation } from '../../../validations/validations.js';
import { authMiddleware } from '../../../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

// Crear una ruta
router.post(
  '/',
  createRutaValidation,
  validateResults,
  createRuta
);

// Obtener todas las rutas
router.get('/', getAllRutas);

// Obtener una ruta por ID
router.get(
  '/:id',
  idParamValidation,
  validateResults,
  getRuta
);

// Actualizar una ruta por ID
router.put(
  '/:id',
  ...idParamValidation, ...updateRutaValidation,
  validateResults,
  updateRuta
);

// Eliminar una ruta (borrado lógico)
router.delete(
  '/:id',
  idParamValidation,
  validateResults,
  deleteRuta
);

export default router;
