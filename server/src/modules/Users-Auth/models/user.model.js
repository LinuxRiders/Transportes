import pool from '../../../config/db.js';
import logger from '../../../utils/logger.js';

export const User = {
    create: async ({ username, password_hash }, connection = pool) => {
        try {
            const [result] = await connection.execute(
                'INSERT INTO USER (username, password_hash, status) VALUES (?, ?, "active")',
                [username, password_hash]
            );
            return result.insertId;
        } catch (error) {
            logger.error(`[Model]:User:create Error inserting user: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    findById: async (id, connection = pool) => {
        try {
            const [rows] = await connection.execute(
                'SELECT user_id, username, status, created_at, updated_at FROM USER WHERE user_id = ? AND deleted_at IS NULL',
                [id]
            );
            return rows[0] || null;
        } catch (error) {
            logger.error(`[Model]:User:findById Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    findByUsername: async (username, connection = pool) => {
        try {
            const [rows] = await connection.execute(
                'SELECT * FROM USER WHERE username = ? AND deleted_at IS NULL',
                [username]
            );
            return rows[0] || null;
        } catch (error) {
            logger.error(`[Model]:User:findByUsername Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    update: async (id, fields, connection = pool) => {
        try {
            const keys = Object.keys(fields);
            const values = Object.values(fields);
            const setClause = keys.map(k => `${k} = ?`).join(', ');
            values.push(id);
            await connection.execute(
                `UPDATE USER SET ${setClause}, updated_at = NOW() WHERE user_id = ?`, values
            );
        } catch (error) {
            logger.error(`[Model]:User:update Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    softDelete: async (id, connection = pool) => {
        try {
            await connection.execute('UPDATE USER SET deleted_at = NOW() WHERE user_id = ?', [id]);
        } catch (error) {
            logger.error(`[Model]:User:softDelete Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    getAll: async (connection = pool) => {
        try {
            const [rows] = await connection.execute(
                'SELECT user_id, username, status, created_at, updated_at FROM USER WHERE deleted_at IS NULL'
            );
            return rows;
        } catch (error) {
            logger.error(`[Model]:User:getAll Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },
};


export const Role = {
    create: async ({ name, description }, connection = pool) => {
        try {
            const [result] = await connection.execute(
                'INSERT INTO ROLE (name, description) VALUES (?, ?)', [name, description]
            );
            return result.insertId;
        } catch (error) {
            logger.error(`[Model]:Role:create Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    findById: async (id, connection = pool) => {
        try {
            const [rows] = await connection.execute(
                'SELECT role_id, name, description, created_at, updated_at FROM ROLE WHERE role_id = ? AND deleted_at IS NULL',
                [id]
            );
            return rows[0] || null;
        } catch (error) {
            logger.error(`[Model]:Role:findById Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    findByName: async (name, connection = pool) => {
        try {
            const [rows] = await connection.execute(
                'SELECT role_id, name FROM ROLE WHERE name = ? AND deleted_at IS NULL',
                [name]
            );
            return rows[0] || null;
        } catch (error) {
            logger.error(`[Model]:Role:findByName Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    update: async (id, fields, connection = pool) => {
        try {
            const keys = Object.keys(fields);
            const values = Object.values(fields);
            const setClause = keys.map(k => `${k} = ?`).join(', ');
            values.push(id);
            await connection.execute(
                `UPDATE ROLE SET ${setClause}, updated_at = NOW() WHERE role_id = ?`, values
            );
        } catch (error) {
            logger.error(`[Model]:Role:update Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    softDelete: async (id, connection = pool) => {
        try {
            await connection.execute('UPDATE ROLE SET deleted_at = NOW() WHERE role_id = ?', [id]);
        } catch (error) {
            logger.error(`[Model]:Role:softDelete Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    getAll: async (connection = pool) => {
        try {
            const [rows] = await connection.execute(
                'SELECT role_id, name, description, created_at, updated_at FROM ROLE WHERE deleted_at IS NULL'
            );
            return rows;
        } catch (error) {
            logger.error(`[Model]:Role:getAll Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    }
};

export const UserRole = {
    assignRole: async (user_id, role_id, connection = pool) => {
        try {
            await connection.execute(
                'INSERT INTO USER_ROLE (user_id, role_id) VALUES (?, ?)',
                [user_id, role_id]
            );
        } catch (error) {
            logger.error(`[Model]:UserRole:assignRole Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    removeRole: async (user_id, role_id, connection = pool) => {
        try {
            await connection.execute(
                'UPDATE USER_ROLE SET deleted_at = NOW() WHERE user_id = ? AND role_id = ? AND deleted_at IS NULL',
                [user_id, role_id]
            );
        } catch (error) {
            logger.error(`[Model]:UserRole:removeRole Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    getRolesByUser: async (user_id, connection = pool) => {
        try {
            const [rows] = await connection.execute(
                `SELECT r.role_id, r.name, r.description
           FROM USER_ROLE ur
           JOIN ROLE r ON ur.role_id = r.role_id
           WHERE ur.user_id = ? AND ur.deleted_at IS NULL AND r.deleted_at IS NULL`,
                [user_id]
            );
            return rows;
        } catch (error) {
            logger.error(`[Model]:UserRole:getRolesByUser Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    }
};
