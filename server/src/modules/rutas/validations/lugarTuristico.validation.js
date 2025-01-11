import { body } from 'express-validator';

export const createLugarTuristicoValidation = [
  body('nombre').isString().notEmpty().withMessage('El nombre del lugar turístico es obligatorio'),
  body('descripcion').optional().isString(),
  body('ubicacion').optional().isString(),
  body('categoria_id').isInt({ min: 1 }).withMessage('categoria_id debe ser un entero positivo')
];

export const updateLugarTuristicoValidation = [
  body('nombre').optional().isString().notEmpty(),
  body('descripcion').optional().isString(),
  body('ubicacion').optional().isString(),
  body('categoria_id').optional().isInt({ min: 1 })
];
