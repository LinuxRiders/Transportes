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
import { idParamValidation, createdByValidation, updatedByValidation } from '../../../validations/validations.js';

const router = Router();

// Crear una categoría de lugar
router.post(
  '/',
  [...createCategoriaLugarValidation, ...createdByValidation],
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
  [...idParamValidation, ...updateCategoriaLugarValidation, ...updatedByValidation],
  validateResults,
  updateCategoriaLugar
);

// Eliminar una categoría de lugar (borrado lógico)
router.delete(
  '/:id',
  [...idParamValidation, ...updatedByValidation],
  validateResults,
  deleteCategoriaLugar
);

export default router;
