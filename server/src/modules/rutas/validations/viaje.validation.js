import { body } from 'express-validator';

export const createViajeValidation = [
  body('ruta_id').isInt({ min: 1 }).withMessage('ruta_id debe ser un entero positivo'),
  body('vehiculo_id').isInt({ min: 1 }).withMessage('vehiculo_id debe ser un entero positivo'),
  body('terminal_id_origen').isInt({ min: 1 }).withMessage('terminal_id_origen debe ser un entero positivo'),
  body('terminal_id_destino').isInt({ min: 1 }).withMessage('terminal_id_destino debe ser un entero positivo'),
  body('fecha_inicio').isISO8601().withMessage('fecha_inicio debe ser una fecha válida'),
  body('fecha_fin').optional().isISO8601().withMessage('fecha_fin debe ser una fecha válida'),
  body('estado')
    .optional()
    .isIn(['Programado', 'En Curso', 'Finalizado'])
    .withMessage('estado debe ser uno de los valores permitidos')
];

export const updateViajeValidation = [
  body('ruta_id').optional().isInt({ min: 1 }),
  body('vehiculo_id').optional().isInt({ min: 1 }),
  body('terminal_id_origen').optional().isInt({ min: 1 }),
  body('terminal_id_destino').optional().isInt({ min: 1 }),
  body('fecha_inicio').optional().isISO8601(),
  body('fecha_fin').optional().isISO8601(),
  body('estado').optional().isIn(['Programado', 'En Curso', 'Finalizado'])
];
