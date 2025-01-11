import pool from '../../../config/db.js';
import logger from '../../../utils/logger.js';

export const Empresa = {
    // CREATE
    create: async ({ nombre, direccion, telefono, ruc, created_by }, connection = pool) => {
        try {
            const [result] = await connection.execute(
                `INSERT INTO empresas (nombre, direccion, telefono, ruc, created_at, created_by)
         VALUES (?, ?, ?, ?, NOW(), ?)`,
                [nombre, direccion, telefono, ruc, created_by]
            );
            return result.insertId;
        } catch (error) {
            logger.error(`[Model]:Empresa:create Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // FIND BY ID
    findById: async (id, connection = pool) => {
        try {
            const [rows] = await connection.execute(
                `SELECT * FROM empresas WHERE id_empresa = ? AND deleted_at IS NULL`,
                [id]
            );
            return rows[0] || null;
        } catch (error) {
            logger.error(`[Model]:Empresa:findById Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // UPDATE
    update: async (id, fields, updated_by, connection = pool) => {
        try {
            const keys = Object.keys(fields);
            const values = Object.values(fields);
            let setClause = keys.map((k) => `${k} = ?`).join(', ');
            setClause += ', updated_at = NOW(), updated_by = ?';
            values.push(updated_by, id);

            await connection.execute(
                `UPDATE empresas SET ${setClause} WHERE id_empresa = ? AND deleted_at IS NULL`,
                values
            );
        } catch (error) {
            logger.error(`[Model]:Empresa:update Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // DELETE
    softDelete: async (id, updated_by, connection = pool) => {
        try {
            await connection.execute(
                `UPDATE empresas SET deleted_at = NOW(), updated_by = ? WHERE id_empresa = ? AND deleted_at IS NULL`,
                [updated_by, id]
            );
        } catch (error) {
            logger.error(`[Model]:Empresa:softDelete Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // GET ALL
    getAll: async (connection = pool) => {
        try {
            const [rows] = await connection.execute(`SELECT * FROM empresas WHERE deleted_at IS NULL`);
            return rows;
        } catch (error) {
            logger.error(`[Model]:Empresa:getAll Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    }
};

export const Ciudad = {
    // CREATE
    create: async ({ nombre, created_by }, connection = pool) => {
        try {
            const [result] = await connection.execute(
                `INSERT INTO ciudades (nombre, created_at, created_by)
           VALUES (?, NOW(), ?)`,
                [nombre, created_by]
            );
            return result.insertId;
        } catch (error) {
            logger.error(`[Model]:Ciudad:create Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // FIND BY ID
    findById: async (id, connection = pool) => {
        try {
            const [rows] = await connection.execute(
                `SELECT * FROM ciudades WHERE id_ciudad = ? AND deleted_at IS NULL`,
                [id]
            );
            return rows[0] || null;
        } catch (error) {
            logger.error(`[Model]:Ciudad:findById Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // UPDATE
    update: async (id, fields, updated_by, connection = pool) => {
        try {
            const keys = Object.keys(fields);
            const values = Object.values(fields);
            let setClause = keys.map((k) => `${k} = ?`).join(', ');
            setClause += ', updated_at = NOW(), updated_by = ?';
            values.push(updated_by, id);

            await connection.execute(
                `UPDATE ciudades SET ${setClause} WHERE id_ciudad = ? AND deleted_at IS NULL`,
                values
            );
        } catch (error) {
            logger.error(`[Model]:Ciudad:update Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // DELETE
    softDelete: async (id, updated_by, connection = pool) => {
        try {
            await connection.execute(
                `UPDATE ciudades SET deleted_at = NOW(), updated_by = ? WHERE id_ciudad = ? AND deleted_at IS NULL`,
                [updated_by, id]
            );
        } catch (error) {
            logger.error(`[Model]:Ciudad:softDelete Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // GET ALL
    getAll: async (connection = pool) => {
        try {
            const [rows] = await connection.execute(`SELECT * FROM ciudades WHERE deleted_at IS NULL`);
            return rows;
        } catch (error) {
            logger.error(`[Model]:Ciudad:getAll Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    }
};

export const Terminal = {
    // CREATE
    create: async ({ nombre, direccion, id_empresa, id_ciudad, created_by }, connection = pool) => {
        try {
            const [result] = await connection.execute(
                `INSERT INTO terminales (nombre, direccion, id_empresa, id_ciudad, created_at, created_by)
           VALUES (?, ?, ?, ?, NOW(), ?)`,
                [nombre, direccion, id_empresa, id_ciudad, created_by]
            );
            return result.insertId;
        } catch (error) {
            logger.error(`[Model]:Terminal:create Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // FIND BY ID
    findById: async (id, connection = pool) => {
        try {
            const [rows] = await connection.execute(
                `SELECT * FROM terminales WHERE id_terminal = ? AND deleted_at IS NULL`,
                [id]
            );
            return rows[0] || null;
        } catch (error) {
            logger.error(`[Model]:Terminal:findById Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // UPDATE
    update: async (id, fields, updated_by, connection = pool) => {
        try {
            const keys = Object.keys(fields);
            const values = Object.values(fields);
            let setClause = keys.map((k) => `${k} = ?`).join(', ');
            setClause += ', updated_at = NOW(), updated_by = ?';
            values.push(updated_by, id);

            await connection.execute(
                `UPDATE terminales SET ${setClause} WHERE id_terminal = ? AND deleted_at IS NULL`,
                values
            );
        } catch (error) {
            logger.error(`[Model]:Terminal:update Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // DELETE
    softDelete: async (id, updated_by, connection = pool) => {
        try {
            await connection.execute(
                `UPDATE terminales SET deleted_at = NOW(), updated_by = ? WHERE id_terminal = ? AND deleted_at IS NULL`,
                [updated_by, id]
            );
        } catch (error) {
            logger.error(`[Model]:Terminal:softDelete Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // GET ALL
    getAll: async (connection = pool) => {
        try {
            const [rows] = await connection.execute(`SELECT * FROM terminales WHERE deleted_at IS NULL`);
            return rows;
        } catch (error) {
            logger.error(`[Model]:Terminal:getAll Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    }
};

export const Viaje = {
    // CREATE
    create: async (
        { id_terminal_origen, id_terminal_destino, id_vehiculo, fecha_hora_salida, fecha_hora_llegada, estado, created_by },
        connection = pool
    ) => {
        try {
            const [result] = await connection.execute(
                `INSERT INTO viajes (id_terminal_origen, id_terminal_destino, id_vehiculo, fecha_hora_salida, fecha_hora_llegada, estado, created_at, created_by)
           VALUES (?, ?, ?, ?, ?, ?, NOW(), ?)`,
                [id_terminal_origen, id_terminal_destino, id_vehiculo, fecha_hora_salida, fecha_hora_llegada, estado, created_by]
            );
            return result.insertId;
        } catch (error) {
            logger.error(`[Model]:Viaje:create Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // FIND BY ID
    findById: async (id, connection = pool) => {
        try {
            const [rows] = await connection.execute(
                `SELECT * FROM viajes WHERE id_viaje = ? AND deleted_at IS NULL`,
                [id]
            );
            return rows[0] || null;
        } catch (error) {
            logger.error(`[Model]:Viaje:findById Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // UPDATE
    update: async (id, fields, updated_by, connection = pool) => {
        try {
            const keys = Object.keys(fields);
            const values = Object.values(fields);
            let setClause = keys.map((k) => `${k} = ?`).join(', ');
            setClause += ', updated_at = NOW(), updated_by = ?';
            values.push(updated_by, id);

            await connection.execute(
                `UPDATE viajes SET ${setClause} WHERE id_viaje = ? AND deleted_at IS NULL`,
                values
            );
        } catch (error) {
            logger.error(`[Model]:Viaje:update Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // DELETE
    softDelete: async (id, updated_by, connection = pool) => {
        try {
            await connection.execute(
                `UPDATE viajes SET deleted_at = NOW(), updated_by = ? WHERE id_viaje = ? AND deleted_at IS NULL`,
                [updated_by, id]
            );
        } catch (error) {
            logger.error(`[Model]:Viaje:softDelete Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // GET ALL
    getAll: async (connection = pool) => {
        try {
            const [rows] = await connection.execute(`SELECT * FROM viajes WHERE deleted_at IS NULL`);
            return rows;
        } catch (error) {
            logger.error(`[Model]:Viaje:getAll Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    }
};

export const ColaTerminal = {
    // CREATE
    create: async ({ id_terminal, id_vehiculo, hora_llegada, estado, created_by }, connection = pool) => {
        try {
            const [result] = await connection.execute(
                `INSERT INTO colas_terminal (id_terminal, id_vehiculo, hora_llegada, estado, created_at, created_by)
           VALUES (?, ?, ?, ?, NOW(), ?)`,
                [id_terminal, id_vehiculo, hora_llegada, estado, created_by]
            );
            return result.insertId;
        } catch (error) {
            logger.error(`[Model]:ColaTerminal:create Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // FIND BY ID
    findById: async (id, connection = pool) => {
        try {
            const [rows] = await connection.execute(
                `SELECT * FROM colas_terminal WHERE id_cola = ? AND deleted_at IS NULL`,
                [id]
            );
            return rows[0] || null;
        } catch (error) {
            logger.error(`[Model]:ColaTerminal:findById Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // UPDATE
    update: async (id, fields, updated_by, connection = pool) => {
        try {
            const keys = Object.keys(fields);
            const values = Object.values(fields);
            let setClause = keys.map((k) => `${k} = ?`).join(', ');
            setClause += ', updated_at = NOW(), updated_by = ?';
            values.push(updated_by, id);

            await connection.execute(
                `UPDATE colas_terminal SET ${setClause} WHERE id_cola = ? AND deleted_at IS NULL`,
                values
            );
        } catch (error) {
            logger.error(`[Model]:ColaTerminal:update Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // DELETE
    softDelete: async (id, updated_by, connection = pool) => {
        try {
            await connection.execute(
                `UPDATE colas_terminal SET deleted_at = NOW(), updated_by = ? WHERE id_cola = ? AND deleted_at IS NULL`,
                [updated_by, id]
            );
        } catch (error) {
            logger.error(`[Model]:ColaTerminal:softDelete Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // GET ALL
    getAll: async (connection = pool) => {
        try {
            const [rows] = await connection.execute(`SELECT * FROM colas_terminal WHERE deleted_at IS NULL`);
            return rows;
        } catch (error) {
            logger.error(`[Model]:ColaTerminal:getAll Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    }
};