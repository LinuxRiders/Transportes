import { body } from 'express-validator';

export const createCombustibleValidation = [
    body('tipo_combustible')
        .isString()
        .notEmpty()
        .withMessage('tipo_combustible es obligatorio')
];

export const updateCombustibleValidation = [
    body('tipo_combustible')
        .optional()
        .isString()
        .notEmpty()
];