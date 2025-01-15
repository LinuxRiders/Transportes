import { Router } from 'express';
import {
  createRutaLugar,
  getAllRutaLugares,
  getRutaLugar,
  updateRutaLugar,
  deleteRutaLugar
} from '../controllers/rutaLugar.controller.js';
import { validateResults } from '../../../middlewares/validationResult.js';
import { createRutaLugarValidation, updateRutaLugarValidation } from '../validations/rutaLugar.validation.js';
import { idParamValidation } from '../../../validations/validations.js';
import { authMiddleware } from '../../../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

// Crear una relación ruta-lugar
router.post(
  '/',
  createRutaLugarValidation,
  validateResults,
  createRutaLugar
);

// Obtener todas las relaciones ruta-lugar
router.get('/', getAllRutaLugares);

// Obtener una relación ruta-lugar por ID
router.get(
  '/:id',
  idParamValidation,
  validateResults,
  getRutaLugar
);

// Actualizar una relación ruta-lugar por ID
router.put(
  '/:id',
  ...idParamValidation, ...updateRutaLugarValidation,
  validateResults,
  updateRutaLugar
);

// Eliminar una relación ruta-lugar (borrado lógico)
router.delete(
  '/:id',
  idParamValidation,
  validateResults,
  deleteRutaLugar
);

export default router;
