import { body } from 'express-validator';

export const createTerminalValidation = [
    body('nombre').isString().notEmpty().withMessage('El nombre es obligatorio'),
    body('direccion').optional().isString().withMessage('La dirección debe ser una cadena de texto'),
    body('id_empresa').isInt({ min: 1 }).withMessage('id_empresa debe ser un entero positivo'),
    body('id_ciudad').isInt({ min: 1 }).withMessage('id_ciudad debe ser un entero positivo')
];

export const updateTerminalValidation = [
    body('nombre').optional().isString().notEmpty(),
    body('direccion').optional().isString(),
    body('id_empresa').optional().isInt({ min: 1 }),
    body('id_ciudad').optional().isInt({ min: 1 })
];
