import { body } from 'express-validator';
import { createdByValidation, updatedByValidation } from '../../../validations/validations.js';

export const createMarcaVehiculoValidation = [
    body('marca')
        .isString()
        .notEmpty()
        .withMessage('marca es obligatoria'),
    body('descripcion')
        .optional()
        .isString()
        .withMessage('descripcion debe ser un string'),
    ...createdByValidation
];

export const updateMarcaVehiculoValidation = [
    body('marca')
        .optional()
        .isString()
        .notEmpty(),
    body('descripcion')
        .optional()
        .isString(),
    ...updatedByValidation
];
