import { body } from 'express-validator';

export const createAsientoValidation = [
    body('fila')
        .isString()
        .notEmpty()
        .withMessage('fila es obligatoria'),
    body('columna')
        .isString()
        .notEmpty()
        .withMessage('columna es obligatoria'),
    body('tipo_asiento')
        .isString()
        .notEmpty()
        .withMessage('tipo_asiento es obligatorio'),
    body('estado_asiento')
        .isString()
        .notEmpty()
        .withMessage('estado_asiento es obligatorio'),
    body('caracteristica')
        .optional()
        .isString()
        .withMessage('caracteristica debe ser string'),
    body('idvehiculo')
        .isInt({ min: 1 })
        .withMessage('idvehiculo debe ser un entero positivo')
];

export const updateAsientoValidation = [
    body('fila')
        .optional()
        .isString()
        .notEmpty(),
    body('columna')
        .optional()
        .isString()
        .notEmpty(),
    body('tipo_asiento')
        .optional()
        .isString()
        .notEmpty(),
    body('estado_asiento')
        .optional()
        .isString()
        .notEmpty(),
    body('caracteristica')
        .optional()
        .isString(),
    body('idvehiculo')
        .optional()
        .isInt({ min: 1 })
];

/**
 * Validación para el endpoint "assignAsientosToVehicle"
 *
 * Se espera en el body:
 * {
 *   idvehiculo: number,
 *   asientos: [
 *     { fila: number, columna: string, tipo_asiento: string, ... },
 *     ...
 *   ]
 * }
 */
export const assignAsientosToVehicleValidation = [
    // 2) Validar que "asientos" sea un array no vacío
    body('asientos')
        .isArray({ min: 1 })
        .withMessage('El campo "asientos" debe ser un array con al menos un elemento'),

    // 3) Validar cada asiento en el array
    //    - fila: entero positivo
    body('asientos.*.fila')
        .isInt({ min: 1 })
        .withMessage('fila debe ser un número entero positivo'),

    //    - columna: string no vacío
    body('asientos.*.columna')
        .isString()
        .notEmpty()
        .withMessage('columna es obligatoria y debe ser string'),

    //    - tipo_asiento: opcional, pero si viene debe ser string
    body('asientos.*.tipo_asiento')
        .optional()
        .isString()
        .withMessage('tipo_asiento debe ser un string si se provee'),

    // Ejemplo extra de validaciones (descomenta si las usas):
    body('asientos.*.estado_asiento')
        .optional()
        .isString()
        .notEmpty()
        .withMessage('estado_asiento debe ser un string si se provee'),

    body('asientos.*.caracteristica')
        .optional()
        .isString()
        .withMessage('caracteristica debe ser un string si se provee'),

    // ... Cualquier otra validación que necesites para cada asiento
];