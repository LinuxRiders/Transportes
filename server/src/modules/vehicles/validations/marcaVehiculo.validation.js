import { body } from 'express-validator';

export const createMarcaVehiculoValidation = [
    body('marca')
        .isString()
        .notEmpty()
        .withMessage('marca es obligatoria'),
    body('descripcion')
        .optional()
        .isString()
        .withMessage('descripcion debe ser un string')
];

export const updateMarcaVehiculoValidation = [
    body('marca')
        .optional()
        .isString()
        .notEmpty(),
    body('descripcion')
        .optional()
        .isString()
];
