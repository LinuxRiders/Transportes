import { body } from 'express-validator';

export const createTipoVehiculoValidation = [
    body('tipo_vehiculo')
        .isString()
        .notEmpty()
        .withMessage('tipo_vehiculo es obligatorio'),
    body('idcarroceria')
        .isInt({ min: 1 })
        .withMessage('idcarroceria debe ser un entero positivo')
];

export const updateTipoVehiculoValidation = [
    body('tipo_vehiculo')
        .optional()
        .isString()
        .notEmpty(),
    body('icono_vehiculo')
        .optional()
        .isString(),
    body('idcarroceria')
        .optional()
        .isInt({ min: 1 })
];
