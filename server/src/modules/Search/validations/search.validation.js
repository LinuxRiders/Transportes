import { query } from "express-validator";

export const searchValidation = [
  // Validaciones para vehículos
  query("marca")
    .optional()
    .isString()
    .withMessage('El parámetro "marca" debe ser una cadena de texto.'),
  query("modelo")
    .optional()
    .isString()
    .withMessage('El parámetro "modelo" debe ser una cadena de texto.'),
  query("anio_fabricacion")
    .optional()
    .isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage('El parámetro "anio_fabricacion" debe ser un año válido.'),
  query("estado")
    .optional()
    .isString()
    .isIn(["activo", "inactivo"])
    .withMessage('El parámetro "estado" debe ser "activo" o "inactivo".'),

  // Validaciones para viajes
  query("ruta")
    .optional()
    .isString()
    .withMessage('El parámetro "ruta" debe ser una cadena de texto.'),
  query("estado_viaje")
    .optional()
    .isString()
    .isIn(["Programado", "En Curso", "Finalizado"])
    .withMessage(
      'El parámetro "estado_viaje" debe ser "Programado", "En Curso" o "Finalizado".'
    ),
  query("fecha_inicio")
    .optional()
    .isISO8601()
    .withMessage(
      'El parámetro "fecha_inicio" debe ser una fecha válida en formato ISO 8601.'
    ),

  // Validaciones para terminales
  query("terminal_nombre")
    .optional()
    .isString()
    .withMessage(
      'El parámetro "terminal_nombre" debe ser una cadena de texto.'
    ),
  query("ciudad")
    .optional()
    .isString()
    .withMessage('El parámetro "ciudad" debe ser una cadena de texto.'),

  // Validaciones para paginación y límites
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('El parámetro "limit" debe ser un entero entre 1 y 100.'),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage('El parámetro "page" debe ser un entero mayor o igual a 1.'),

  // Validaciones para ordenación
  query("orderBy")
    .optional()
    .isString()
    .isIn(["id", "marca", "modelo", "anio_fabricacion", "estado"])
    .withMessage(
      'El parámetro "orderBy" debe ser "id", "marca", "modelo", "anio_fabricacion", o "estado".'
    ),
  query("order")
    .optional()
    .isString()
    .isIn(["asc", "desc"])
    .withMessage('El parámetro "order" debe ser "asc" o "desc".'),
];

export const searchLugaresValidation = [
  // Validaciones para lugares turísticos
  query("categoria_id")
    .optional()
    .isInt({ min: 1 })
    .withMessage(
      'El parámetro "categoria_id" debe ser un número entero mayor o igual a 1.'
    ),
  query("nombre_categoria")
    .optional()
    .isString()
    .withMessage(
      'El parámetro "nombre_categoria" debe ser una cadena de texto.'
    ),
  query("nombre_lugar")
    .optional()
    .isString()
    .withMessage('El parámetro "nombre_lugar" debe ser una cadena de texto.'),

  // Validaciones para paginación y límites
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('El parámetro "limit" debe ser un entero entre 1 y 100.'),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage('El parámetro "page" debe ser un entero mayor o igual a 1.'),

  // Validaciones para ordenación
  query("orderBy")
    .optional()
    .isString()
    .isIn(["id_lugares_turisticos", "lugar_nombre", "categoria_nombre"])
    .withMessage(
      'El parámetro "orderBy" debe ser "id_lugares_turisticos", "lugar_nombre" o "categoria_nombre".'
    ),
  query("order")
    .optional()
    .isString()
    .isIn(["asc", "desc"])
    .withMessage('El parámetro "order" debe ser "asc" o "desc".'),
];
