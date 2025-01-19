import { body } from "express-validator";

export const createColaValidation = [
  body("id_terminal")
    .isInt({ min: 1 })
    .withMessage("id_terminal debe ser un entero positivo"),
  body("id_vehiculo")
    .isInt({ min: 1 })
    .withMessage("id_vehiculo debe ser un entero positivo"),
  body("hora_llegada")
    .isISO8601()
    .withMessage("hora_llegada debe ser una fecha válida"),
  body("estado").isString().notEmpty().withMessage("estado es obligatorio"),
];

export const updateColaValidation = [
  body("id_terminal").optional().isInt({ min: 1 }),
  body("id_vehiculo").optional().isInt({ min: 1 }),
  body("hora_llegada").optional().isISO8601(),
  body("estado").optional().isString().notEmpty(),
];
