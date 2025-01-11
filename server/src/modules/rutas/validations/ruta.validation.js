import { body } from 'express-validator';

export const createRutaValidation = [
  body('nombre_ruta').isString().notEmpty().withMessage('El nombre de la ruta es obligatorio'),
  body('descripcion').optional().isString(),
  body('duracion').optional().isString(),
  body('precio').optional().isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo')
];

export const updateRutaValidation = [
  body('nombre_ruta').optional().isString().notEmpty(),
  body('descripcion').optional().isString(),
  body('duracion').optional().isString(),
  body('precio').optional().isFloat({ min: 0 })
];
