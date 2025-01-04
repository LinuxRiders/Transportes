import pool from '../../../config/db.js';
import logger from '../../../utils/logger.js';

export const RefreshToken = {
    create: async ({ user_id, token, expires_at, session_start, refresh_count = 0 }, connection = pool) => {
        try {
            const [result] = await connection.execute(
                'INSERT INTO REFRESH_TOKEN (user_id, token, expires_at, session_start, refresh_count) VALUES (?, ?, ?, ?, ?)',
                [user_id, token, expires_at, session_start, refresh_count]
            );
            return result.insertId;
        } catch (error) {
            logger.error(`[Model]:RefreshToken:create Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    findByToken: async (token, connection = pool) => {
        try {
            const [rows] = await connection.execute(
                'SELECT * FROM REFRESH_TOKEN WHERE token = ? AND revoked_at IS NULL AND expires_at > NOW()',
                [token]
            );
            return rows[0] || null;
        } catch (error) {
            logger.error(`[Model]:RefreshToken:findByToken Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    revoke: async (token, connection = pool) => {
        try {
            await connection.execute(
                'UPDATE REFRESH_TOKEN SET revoked_at = NOW() WHERE token = ?',
                [token]
            );
        } catch (error) {
            logger.error(`[Model]:RefreshToken:revoke Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    revokeAllForUser: async (user_id, connection = pool) => {
        try {
            await connection.execute(
                'UPDATE REFRESH_TOKEN SET revoked_at = NOW() WHERE user_id = ? AND revoked_at IS NULL',
                [user_id]
            );
        } catch (error) {
            logger.error(`[Model]:RefreshToken:revokeAllForUser Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    countValidTokensForUser: async (user_id, session_start, connection = pool) => {
        try {
            const [rows] = await connection.execute(
                'SELECT COUNT(*) as count FROM REFRESH_TOKEN WHERE user_id = ? AND revoked_at IS NULL AND expires_at > NOW() AND session_start = ?',
                [user_id, session_start]
            );
            return rows[0].count;
        } catch (error) {
            logger.error(`[Model]:RefreshToken:countValidTokensForUser Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    }
};
