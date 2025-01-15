import { body } from 'express-validator';

export const createCarroceriaValidation = [
    body('tipo_carroceria')
        .isString()
        .notEmpty()
        .withMessage('tipo_carroceria es obligatorio')
];

export const updateCarroceriaValidation = [
    body('tipo_carroceria')
        .optional()
        .isString()
        .notEmpty()
];
