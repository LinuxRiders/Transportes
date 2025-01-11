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
import { idParamValidation, createdByValidation, updatedByValidation } from '../../../validations/validations.js';

const router = Router();

// Crear una ruta
router.post(
  '/',
  [...createRutaValidation, ...createdByValidation],
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
  [...idParamValidation, ...updateRutaValidation, ...updatedByValidation],
  validateResults,
  updateRuta
);

// Eliminar una ruta (borrado lógico)
router.delete(
  '/:id',
  [...idParamValidation, ...updatedByValidation],
  validateResults,
  deleteRuta
);

export default router;
