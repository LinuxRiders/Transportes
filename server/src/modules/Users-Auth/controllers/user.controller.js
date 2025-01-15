import { User, UserRole } from '../models/user.model.js';
import { hashPassword } from '../../../utils/password.js';
import logger from '../../../utils/logger.js';

export const createUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;


        const existing = await User.findByEmail(email);

        if (existing) {
            logger.warn(`UserController:createUser Email already exists: ${username}`);
            return res.status(409).json({ error: 'Email already exists' });
        }

        const password_hash = await hashPassword(password);
        const userId = await User.create({ username, email, password_hash });
        const user = await User.findById(userId);

        logger.info(`UserController: createUser User created: user_id=${userId}`);
        res.status(201).json({ data: user });

    } catch (error) {
        logger.error(`UserController: createUser Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.getAll();

        logger.info(`UserController:getAllUsers Retrieved ${users.length} users`);
        res.json({ data: users });

    } catch (error) {
        logger.error(`UserController:getAllUsers Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            logger.warn(`UserController:getUser Not found user_id=${req.params.id}`);
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ data: user });
    } catch (error) {
        logger.error(`UserController:getUser Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            logger.warn(`UserController:updateUser Not found user_id=${req.params.id}`);
            return res.status(404).json({ error: 'User not found' });
        }

        const updates = {};
        if (req.body.password) {
            updates.password_hash = await hashPassword(req.body.password);
        }
        if (req.body.status) {
            updates.status = req.body.status;
        }

        if (Object.keys(updates).length > 0) {
            await User.update(req.params.id, updates);
        }

        const updatedUser = await User.findById(req.params.id);

        logger.info(`UserController:updateUser User updated user_id=${req.params.id}`);
        res.json({ data: updatedUser });

    } catch (error) {
        logger.error(`UserController:updateUser Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            logger.warn(`UserController:deleteUser Not found user_id=${req.params.id}`);
            return res.status(404).json({ error: 'User not found' });
        }

        await User.softDelete(req.params.id);

        logger.info(`UserController:deleteUser User soft deleted user_id=${req.params.id}`);
        res.status(204).send();

    } catch (error) {
        logger.error(`UserController:deleteUser Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

/**
 * Obtiene la información del usuario autenticado
 */
export const getCurrentUser = async (req, res, next) => {
    try {
        const userId = req.user.sub; // Asumiendo que el middleware de autenticación pone la info del usuario en req.user

        // Obtener información básica del usuario
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Obtener roles del usuario
        const roles = await UserRole.getRolesByUser(userId);
        const roleNames = roles.map(role => role.name);


        // Construir la respuesta
        const userData = {
            id: user.user_id,
            username: user.username,
            email: user.email,
            roles: roleNames
        };

        logger.info(`UserController:getCurrentUser user_id=${userId}`);
        res.json({ data: userData });

    } catch (error) {
        logger.error(`UserController:getCurrentUser Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};
