import { body } from 'express-validator';

export const createCiudadValidation = [
    body('nombre').isString().notEmpty().withMessage('El nombre es obligatorio')
];

export const updateCiudadValidation = [
    body('nombre').optional().isString().notEmpty()
];
