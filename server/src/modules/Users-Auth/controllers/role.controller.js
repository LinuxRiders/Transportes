import { Role } from '../models/user.model.js';
import logger from '../../../utils/logger.js';

export const createRole = async (req, res, next) => {
    try {
        const { name, description } = req.body;

        const roleId = await Role.create({ name, description });
        const role = await Role.findById(roleId);

        logger.info(`RoleController:createRole Created role_id=${roleId}`);
        res.status(201).json({ data: role });

    } catch (error) {
        logger.error(`RoleController:createRole Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const getAllRoles = async (req, res, next) => {
    try {
        const roles = await Role.getAll();

        logger.info(`RoleController:getAllRoles Retrieved ${roles.length} roles`);
        res.json({ data: roles });

    } catch (error) {
        logger.error(`RoleController:getAllRoles Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const getRole = async (req, res, next) => {
    try {
        const role = await Role.findById(req.params.id);

        if (!role) {
            logger.warn(`RoleController:getRole Not found role_id=${req.params.id}`);
            return res.status(404).json({ error: 'Role not found' });
        }

        res.json({ data: role });

    } catch (error) {
        logger.error(`RoleController:getRole Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const updateRole = async (req, res, next) => {
    try {
        const role = await Role.findById(req.params.id);

        if (!role) {
            logger.warn(`RoleController:updateRole Not found role_id=${req.params.id}`);
            return res.status(404).json({ error: 'Role not found' });
        }

        const updates = {};
        if (req.body.name) updates.name = req.body.name;
        if (req.body.description) updates.description = req.body.description;

        if (Object.keys(updates).length > 0) {
            await Role.update(req.params.id, updates);
        }

        const updatedRole = await Role.findById(req.params.id);

        logger.info(`RoleController:updateRole Updated role_id=${req.params.id}`);
        res.json({ data: updatedRole });

    } catch (error) {
        logger.error(`RoleController:updateRole Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const deleteRole = async (req, res, next) => {
    try {
        const role = await Role.findById(req.params.id);

        if (!role) {
            logger.warn(`RoleController:deleteRole Not found role_id=${req.params.id}`);
            return res.status(404).json({ error: 'Role not found' });
        }

        await Role.softDelete(req.params.id);

        logger.info(`RoleController:deleteRole Soft deleted role_id=${req.params.id}`);
        res.status(204).send();

    } catch (error) {
        logger.error(`RoleController:deleteRole Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};
