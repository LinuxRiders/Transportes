import { body, param } from 'express-validator';

export const assignRoleValidation = [
    body('user_id').isInt(),
    body('roles').isArray().notEmpty().withMessage('Roles must be a non-empty array of strings')
    // body('role_id').isInt()
];

export const userParamValidation = [
    param('user_id').isInt()
];
