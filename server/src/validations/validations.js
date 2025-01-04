import { param, body } from 'express-validator';

// 1) Validar parámetro ":id" como entero positivo
export const idParamValidation = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('El id debe ser un entero positivo')
];

// 2) Validar "created_by" como entero positivo (obligatorio)
export const createdByValidation = [
    body('created_by')
        .isInt({ min: 1 })
        .withMessage('created_by debe ser un entero positivo')
];

// 3) Validar "updated_by" como entero positivo (opcional en update)
export const updatedByValidation = [
    body('updated_by')
        .optional()
        .isInt({ min: 1 })
        .withMessage('updated_by debe ser un entero positivo, si se provee')
];
