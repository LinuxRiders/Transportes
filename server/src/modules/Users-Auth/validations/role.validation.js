import { body, param } from 'express-validator';

export const createRoleValidation = [
    body('name').isString().notEmpty()
];

export const roleIdParamValidation = [
    param('id').isInt()
];
