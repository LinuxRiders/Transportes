import { Router } from 'express';
import {
  createCategoriaLugar,
  getAllCategoriasLugares,
  getCategoriaLugar,
  updateCategoriaLugar,
  deleteCategoriaLugar
} from '../controllers/categoriaLugar.controller.js';
import { validateResults } from '../../../middlewares/validationResult.js';
import { createCategoriaLugarValidation, updateCategoriaLugarValidation } from '../validations/categoriaLugar.validation.js';
import { idParamValidation } from '../../../validations/validations.js';
import { authMiddleware } from '../../../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

// Crear una categoría de lugar
router.post(
  '/',
  createCategoriaLugarValidation,
  validateResults,
  createCategoriaLugar
);

// Obtener todas las categorías de lugares
router.get('/', getAllCategoriasLugares);

// Obtener una categoría de lugar por ID
router.get(
  '/:id',
  idParamValidation,
  validateResults,
  getCategoriaLugar
);

// Actualizar una categoría de lugar por ID
router.put(
  '/:id',
  ...idParamValidation, ...updateCategoriaLugarValidation,
  validateResults,
  updateCategoriaLugar
);

// Eliminar una categoría de lugar (borrado lógico)
router.delete(
  '/:id',
  idParamValidation,
  validateResults,
  deleteCategoriaLugar
);

export default router;
