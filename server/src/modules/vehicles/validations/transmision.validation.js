import { body } from 'express-validator';

export const createTransmisionValidation = [
    body('tipo_transmision')
        .isString()
        .notEmpty()
        .withMessage('tipo_transmision es obligatorio')
];

export const updateTransmisionValidation = [
    body('tipo_transmision')
        .optional()
        .isString()
        .notEmpty()
];
