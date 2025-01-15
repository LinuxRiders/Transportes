import { body, param } from 'express-validator';

export const createRoleValidation = [
    body('name').isString().notEmpty(),
    body('description').isString().notEmpty(),
];

export const roleIdParamValidation = [
    param('id').isInt()
];
