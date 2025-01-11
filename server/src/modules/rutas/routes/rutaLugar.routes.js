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
import { idParamValidation, createdByValidation, updatedByValidation } from '../../../validations/validations.js';

const router = Router();

// Crear una relación ruta-lugar
router.post(
  '/',
  [...createRutaLugarValidation, ...createdByValidation],
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
  [...idParamValidation, ...updateRutaLugarValidation, ...updatedByValidation],
  validateResults,
  updateRutaLugar
);

// Eliminar una relación ruta-lugar (borrado lógico)
router.delete(
  '/:id',
  [...idParamValidation, ...updatedByValidation],
  validateResults,
  deleteRutaLugar
);

export default router;
