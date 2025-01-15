import { body, param } from 'express-validator';

export const createUserValidation = [
    body('username').isString().isLength({ min: 3 }),
    body('email').isEmail().notEmpty(),
    body('password').isString().isLength({ min: 6 })
];

export const assignGuiaToUserValidation = [
    // idPersona: requerido, entero
    body('idPersona')
        .notEmpty().withMessage('El ID de la persona (idPersona) es obligatorio')
        .isInt().withMessage('El ID de la persona debe ser un número entero'),

    // Mínimo 3 caracteres:
    body('numero_licencia_turismo')
        .trim()
        .notEmpty().withMessage('El número de licencia es obligatorio')
        .isString().withMessage('El número de licencia debe ser texto')
        .isLength({ min: 3 }).withMessage('Debe tener al menos 3 caracteres'),

    // idioma_materno: campo JSON
    // Validamos que sea un JSON válido (puede ser obligatorio u opcional)
    body('idioma_materno')
        .notEmpty().withMessage('El campo idioma_materno es obligatorio')
        .custom((value) => {
            try {
                // Intentamos hacer JSON.parse para validar el formato
                JSON.parse(value);
            } catch (error) {
                throw new Error('El campo idioma_materno debe contener un JSON válido');
            }
            return true;
        }),
];

export const assignConductorToUserValidation = [
    // idPersona: obligatorio y numérico (INT)
    body('idPersona')
        .notEmpty().withMessage('El idPersona es obligatorio')
        .isInt().withMessage('El idPersona debe ser un número entero'),

    // foto_conductor: obligatorio, texto
    body('foto_conductor')
        .trim()
        .notEmpty().withMessage('La foto del conductor es obligatoria')
        .isString().withMessage('La foto del conductor debe ser una cadena de texto'),

    // celular_contacto: obligatorio, texto, longitud hasta 17
    body('celular_contacto')
        .trim()
        .notEmpty().withMessage('El celular de contacto es obligatorio')
        .isString().withMessage('El celular de contacto debe ser una cadena de texto')
        .isLength({ max: 17 }).withMessage('El celular de contacto no debe exceder 17 caracteres')
];

export const createFullUserValidation = [
    // username
    body('username')
        .trim()
        .notEmpty().withMessage('El nombre de usuario es obligatorio')
        .isString().withMessage('El nombre de usuario debe ser una cadena de texto')
        .isLength({ min: 3 }).withMessage('El nombre de usuario debe tener al menos 3 caracteres'),

    // email
    body('email')
        .trim()
        .notEmpty().withMessage('El correo electrónico es obligatorio')
        .isEmail().withMessage('Debes proporcionar un correo electrónico válido'),

    // password
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isString().withMessage('La contraseña debe ser una cadena de texto')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),

    // profile.nombre
    body('profile.nombre')
        .trim()
        .notEmpty().withMessage('El nombre es obligatorio')
        .isString().withMessage('El nombre debe ser una cadena de texto'),

    // profile.apellido_paterno
    body('profile.apellido_paterno')
        .trim()
        .notEmpty().withMessage('El apellido paterno es obligatorio')
        .isString().withMessage('El apellido paterno debe ser una cadena de texto'),

    // profile.apellido_materno
    body('profile.apellido_materno')
        .trim()
        .notEmpty().withMessage('El apellido materno es obligatorio')
        .isString().withMessage('El apellido materno debe ser una cadena de texto'),

    // profile.fecha_nacimiento
    // Se usa isISO8601 para validar fecha con el estándar ISO 8601, por ejemplo "YYYY-MM-DD"
    body('profile.fecha_nacimiento')
        .notEmpty().withMessage('La fecha de nacimiento es obligatoria')
        .isISO8601().withMessage('La fecha de nacimiento debe ser una fecha válida (formato ISO8601)'),

    // profile.phone (opcional)
    body('profile.celular')
        .optional()
        .isLength({ min: 9 })
        .isString().withMessage('El número de teléfono debe ser una cadena de texto'),

    // profile.direccion
    body('profile.direccion')
        .trim()
        .notEmpty().withMessage('La dirección es obligatoria')
        .isString().withMessage('La dirección debe ser una cadena de texto'),
];


// {
//     "username": "johnDoe42",
//     "email": "john@example.com",
//     "password": "secretPass",
//     "profile": {
//       "nombre": "John",
//       "apellido_paterno": "Doe",
//       "apellido_materno": "Smith",
//       "fecha_nacimiento": "1990-05-15",
//       "phone": "555-555-5555",
//       "direccion": "123 Main Street, Springfield"
//     }
//   }