import { body } from 'express-validator';

export const loginValidation = [
    body('username').isString().notEmpty(),
    body('password').isString().notEmpty()
];