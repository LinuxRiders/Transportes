import { body } from 'express-validator';
import { createdByValidation, updatedByValidation } from '../../../validations/validations.js';

export const createCombustibleValidation = [
    body('tipo_combustible')
        .isString()
        .notEmpty()
        .withMessage('tipo_combustible es obligatorio'),
    ...createdByValidation
];

export const updateCombustibleValidation = [
    body('tipo_combustible')
        .optional()
        .isString()
        .notEmpty(),
    ...updatedByValidation
];