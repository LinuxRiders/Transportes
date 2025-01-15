import { body } from 'express-validator';

export const loginValidation = [
    body('email').isEmail().notEmpty(),
    body('password').isString().notEmpty()
];