import { body, param } from 'express-validator';

export const createUserValidation = [
    body('username').isString().isLength({ min: 3 }),
    body('password').isString().isLength({ min: 6 })
];

export const userIdParamValidation = [
    param('id').isInt()
];


export const createFullUserValidation = [
    body('username').isString().isLength({ min: 3 }),
    body('password').isString().isLength({ min: 6 }),
    body('email').optional().isEmail(),
    body('profile.dni').isString().isLength({ min: 3 }).notEmpty(),
    body('profile.first_name').isString().notEmpty(),
    body('profile.last_name').isString().notEmpty(),
    body('profile.phone').optional().isString(),
    body('roles').isArray().notEmpty().withMessage('Roles must be a non-empty array of strings')
];