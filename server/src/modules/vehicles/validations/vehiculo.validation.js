import { body } from 'express-validator';


// Validaciones para crear (POST /vehiculo)
export const createVehiculoValidation = [
    body('capacidad_asientos')
        .isInt({ min: 1 })
        .withMessage('capacidad_asientos debe ser un entero positivo'),
    body('capacidad_maletas')
        .isInt({ min: 0 })
        .withMessage('capacidad_maletas debe ser un entero >= 0'),
    body('anio_fabricacion')
        .isInt({ min: 1900, max: new Date().getFullYear() })
        .withMessage('anio_fabricacion debe ser un año válido'),
    body('num_chasis')
        .isString()
        .notEmpty()
        .withMessage('num_chasis es obligatorio'),
    body('placa')
        .isString()
        .notEmpty()
        .withMessage('placa es obligatoria'),
    body('modelo')
        .isString()
        .notEmpty()
        .withMessage('modelo es obligatorio'),
    body('kilometraje_actual')
        .isInt({ min: 0 })
        .withMessage('kilometraje_actual debe ser un entero >= 0'),
    body('fecha_compra')
        .optional()
        .isDate()
        .withMessage('fecha_compra debe ser una fecha válida (YYYY-MM-DD)'),
    body('estado')
        .isString()
        .notEmpty()
        .withMessage('estado es obligatorio'),
    body('fotos_vehiculo')
        .optional()
        .isString()
        .withMessage('fotos_vehiculo debe ser un string (o JSON/stringified)'),
    body('id_marca')
        .isInt({ min: 1 })
        .withMessage('id_marca debe ser un entero positivo'),
    body('idtransmision')
        .isInt({ min: 1 })
        .withMessage('idtransmision debe ser un entero positivo'),
    body('idtipo_vehiculo')
        .isInt({ min: 1 })
        .withMessage('idtipo_vehiculo debe ser un entero positivo'),
    body('idcombustible')
        .isInt({ min: 1 })
        .withMessage('idcombustible debe ser un entero positivo')
];

// Validaciones para actualizar (PUT /vehiculo/:id)
export const updateVehiculoValidation = [
    body('capacidad_asientos')
        .optional()
        .isInt({ min: 1 }),
    body('capacidad_maletas')
        .optional()
        .isInt({ min: 0 }),
    body('anio_fabricacion')
        .optional()
        .isInt({ min: 1900, max: new Date().getFullYear() }),
    body('num_chasis')
        .optional()
        .isString()
        .notEmpty(),
    body('placa')
        .optional()
        .isString()
        .notEmpty(),
    body('modelo')
        .optional()
        .isString()
        .notEmpty(),
    body('kilometraje_actual')
        .optional()
        .isInt({ min: 0 }),
    body('fecha_compra')
        .optional()
        .isDate(),
    body('estado')
        .optional()
        .isString()
        .notEmpty(),
    body('fotos_vehiculo')
        .optional()
        .isString(),
    body('id_marca')
        .optional()
        .isInt({ min: 1 }),
    body('idtransmision')
        .optional()
        .isInt({ min: 1 }),
    body('idtipo_vehiculo')
        .optional()
        .isInt({ min: 1 }),
    body('idcombustible')
        .optional()
        .isInt({ min: 1 })
];
