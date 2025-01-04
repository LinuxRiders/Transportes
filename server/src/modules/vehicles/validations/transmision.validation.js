import { body } from 'express-validator';
import { createdByValidation, updatedByValidation } from '../../../validations/validations.js';

export const createTransmisionValidation = [
    body('tipo_transmision')
        .isString()
        .notEmpty()
        .withMessage('tipo_transmision es obligatorio'),
    ...createdByValidation
];

export const updateTransmisionValidation = [
    body('tipo_transmision')
        .optional()
        .isString()
        .notEmpty(),
    ...updatedByValidation
];
