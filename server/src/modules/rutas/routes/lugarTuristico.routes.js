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
import { idParamValidation } from '../../../validations/validations.js';
import { authMiddleware } from '../../../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

// Crear un lugar turístico
router.post(
  '/',
  createLugarTuristicoValidation,
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
  ...idParamValidation, ...updateLugarTuristicoValidation,
  validateResults,
  updateLugarTuristico
);

// Eliminar un lugar turístico (borrado lógico)
router.delete(
  '/:id',
  idParamValidation,
  validateResults,
  deleteLugarTuristico
);

export default router;
