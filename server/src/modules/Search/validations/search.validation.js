import { query } from 'express-validator';

export const searchValidation = [
    // Validaciones para vehículos
    query('marca')
        .optional()
        .isString()
        .withMessage('El parámetro "marca" debe ser una cadena de texto.'),
    query('modelo')
        .optional()
        .isString()
        .withMessage('El parámetro "modelo" debe ser una cadena de texto.'),
    query('anio_fabricacion')
        .optional()
        .isInt({ min: 1900, max: new Date().getFullYear() })
        .withMessage('El parámetro "anio_fabricacion" debe ser un año válido.'),
    query('estado')
        .optional()
        .isString()
        .isIn(['activo', 'inactivo'])
        .withMessage('El parámetro "estado" debe ser "activo" o "inactivo".'),

    // Validaciones para viajes
    query('ruta')
        .optional()
        .isString()
        .withMessage('El parámetro "ruta" debe ser una cadena de texto.'),
    query('estado_viaje')
        .optional()
        .isString()
        .isIn(['Programado', 'En Curso', 'Finalizado'])
        .withMessage('El parámetro "estado_viaje" debe ser "Programado", "En Curso" o "Finalizado".'),
    query('fecha_inicio')
        .optional()
        .isISO8601()
        .withMessage('El parámetro "fecha_inicio" debe ser una fecha válida en formato ISO 8601.'),

    // Validaciones para terminales
    query('terminal_nombre')
        .optional()
        .isString()
        .withMessage('El parámetro "terminal_nombre" debe ser una cadena de texto.'),
    query('ciudad')
        .optional()
        .isString()
        .withMessage('El parámetro "ciudad" debe ser una cadena de texto.')
];
