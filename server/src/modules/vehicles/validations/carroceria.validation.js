import { body } from 'express-validator';
import { createdByValidation, updatedByValidation } from '../../../validations/validations.js';

export const createCarroceriaValidation = [
    body('tipo_carroceria')
        .isString()
        .notEmpty()
        .withMessage('tipo_carroceria es obligatorio'),
    ...createdByValidation
];

export const updateCarroceriaValidation = [
    body('tipo_carroceria')
        .optional()
        .isString()
        .notEmpty(),
    ...updatedByValidation
];
