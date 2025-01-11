import { body } from 'express-validator';

export const createViajeValidation = [
    body('id_terminal_origen').isInt({ min: 1 }).withMessage('id_terminal_origen debe ser un entero positivo'),
    body('id_terminal_destino').isInt({ min: 1 }).withMessage('id_terminal_destino debe ser un entero positivo'),
    body('id_vehiculo').isInt({ min: 1 }).withMessage('id_vehiculo debe ser un entero positivo'),
    body('fecha_hora_salida').isISO8601().withMessage('fecha_hora_salida debe ser una fecha válida'),
    body('fecha_hora_llegada').optional().isISO8601().withMessage('fecha_hora_llegada debe ser una fecha válida'),
    body('estado').optional().isIn(['pendiente', 'en_progreso', 'completado', 'interrumpido', 'cancelado']).withMessage('estado inválido')
];

export const updateViajeValidation = [
    body('id_terminal_origen').optional().isInt({ min: 1 }),
    body('id_terminal_destino').optional().isInt({ min: 1 }),
    body('id_vehiculo').optional().isInt({ min: 1 }),
    body('fecha_hora_salida').optional().isISO8601(),
    body('fecha_hora_llegada').optional().isISO8601(),
    body('estado').optional().isIn(['pendiente', 'en_progreso', 'completado', 'interrumpido', 'cancelado'])
];
