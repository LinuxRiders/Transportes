import { body } from 'express-validator';

export const createEmpresaValidation = [
    body('nombre').isString().notEmpty().withMessage('El nombre es obligatorio'),
    body('direccion').isString().notEmpty().withMessage('La dirección es obligatoria'),
    body('telefono').isString().notEmpty().withMessage('El teléfono es obligatorio'),
    body('ruc').isString().notEmpty().withMessage('El RUC es obligatorio')
];

export const updateEmpresaValidation = [
    body('nombre').optional().isString().notEmpty(),
    body('direccion').optional().isString().notEmpty(),
    body('telefono').optional().isString().notEmpty(),
    body('ruc').optional().isString().notEmpty()
];
