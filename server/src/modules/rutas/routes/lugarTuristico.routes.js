import { Router } from 'express';
import {
  createLugarTuristico,
  getAllLugaresTuristicos,
  getLugarTuristico,
  updateLugarTuristico,
  deleteLugarTuristico
} from '../controllers/lugarTuristico.controller.js';
import { validateResults } from '../../../middlewares/validationResult.js';
import { createLugarTuristicoValidation, updateLugarTuristicoValidation } from '../validations/lugarTuristico.validation.js';
import { idParamValidation, createdByValidation, updatedByValidation } from '../../../validations/validations.js';

const router = Router();

// Crear un lugar turístico
router.post(
  '/',
  [...createLugarTuristicoValidation, ...createdByValidation],
  validateResults,
  createLugarTuristico
);

// Obtener todos los lugares turísticos
router.get('/', getAllLugaresTuristicos);

// Obtener un lugar turístico por ID
router.get(
  '/:id',
  idParamValidation,
  validateResults,
  getLugarTuristico
);

// Actualizar un lugar turístico por ID
router.put(
  '/:id',
  [...idParamValidation, ...updateLugarTuristicoValidation, ...updatedByValidation],
  validateResults,
  updateLugarTuristico
);

// Eliminar un lugar turístico (borrado lógico)
router.delete(
  '/:id',
  [...idParamValidation, ...updatedByValidation],
  validateResults,
  deleteLugarTuristico
);

export default router;
