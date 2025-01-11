import { body } from 'express-validator';

export const createCategoriaLugarValidation = [
  body('nombre_categoria').isString().notEmpty().withMessage('El nombre de la categoría es obligatorio'),
  body('descripcion').optional().isString()
];

export const updateCategoriaLugarValidation = [
  body('nombre_categoria').optional().isString().notEmpty(),
  body('descripcion').optional().isString()
];
