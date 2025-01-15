import { body, param } from 'express-validator';

export const createUserValidation = [
    body('username').isString().isLength({ min: 3 }),
    body('email').isEmail().notEmpty(),
    body('password').isString().isLength({ min: 6 })
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

    // roles
    body('roles')
        .isArray({ min: 1 })
        .withMessage('El campo roles debe ser un arreglo no vacío')
        .custom((roles) => {
            // Lista de roles válidos
            const allowedRoles = ['User', 'Guia', 'Conductor'];

            // Verifica que cada elemento sea un rol permitido
            roles.forEach((role) => {
                if (!allowedRoles.includes(role)) {
                    throw new Error(
                        `El rol '${role}' no es válido. Debe ser uno de: ${allowedRoles.join(', ')}`
                    );
                }
            });

            return true;
        }),
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
//     },
//     "roles": ["Admin", "User"]
//   }