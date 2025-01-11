import { body } from 'express-validator';

export const createRutaLugarValidation = [
  body('ruta_id').isInt({ min: 1 }).withMessage('ruta_id debe ser un entero positivo'),
  body('lugar_turistico_id').isInt({ min: 1 }).withMessage('lugar_turistico_id debe ser un entero positivo'),
  body('orden_visita').isInt({ min: 1 }).withMessage('orden_visita debe ser un entero positivo'),
  body('tiempo_estancia').isInt({ min: 1 }).withMessage('tiempo_estancia debe ser un entero positivo')
];

export const updateRutaLugarValidation = [
  body('ruta_id').optional().isInt({ min: 1 }),
  body('lugar_turistico_id').optional().isInt({ min: 1 }),
  body('orden_visita').optional().isInt({ min: 1 }),
  body('tiempo_estancia').optional().isInt({ min: 1 })
];
