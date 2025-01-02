import pool from '../../../config/db.js';
import logger from '../../../utils/logger.js';

export const Vehiculo = {
    create: async ({
        capacidad_asientos,
        capacidad_maletas,
        anio_fabricacion,
        num_chasis,
        placa,
        modelo,
        kilometraje_actual,
        fecha_compra,
        estado,
        fotos_vehiculo,
        id_marca,
        idtransmision,
        idtipo_vehiculo,
        idcombustible
    }, connection = pool) => {
        try {
            const [result] = await connection.execute(
                `INSERT INTO vehiculo
           (capacidad_asientos, capacidad_maletas, anio_fabricacion,
            num_chasis, placa, modelo, kilometraje_actual, fecha_compra,
            estado, fotos_vehiculo,
            id_marca, idtransmision, idtipo_vehiculo, idcombustible)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    capacidad_asientos, capacidad_maletas, anio_fabricacion,
                    num_chasis, placa, modelo, kilometraje_actual, fecha_compra,
                    estado, fotos_vehiculo,
                    id_marca, idtransmision, idtipo_vehiculo, idcombustible
                ]
            );
            return result.insertId;
        } catch (error) {
            logger.error(`[Model]:Vehiculo:create Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    findById: async (id, connection = pool) => {
        try {
            const [rows] = await connection.execute(
                `SELECT *
           FROM vehiculo
           WHERE idvehiculo = ?`,
                [id]
            );
            return rows[0] || null;
        } catch (error) {
            logger.error(`[Model]:Vehiculo:findById Error: ${error.message}`, { stack: error.stack });
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
                `UPDATE vehiculo
           SET ${setClause}
           WHERE idvehiculo = ?`,
                values
            );
        } catch (error) {
            logger.error(`[Model]:Vehiculo:update Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    softDelete: async (id, connection = pool) => {
        try {
            // Borrado físico
            await connection.execute('DELETE FROM vehiculo WHERE idvehiculo = ?', [id]);
        } catch (error) {
            logger.error(`[Model]:Vehiculo:softDelete Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    getAll: async (connection = pool) => {
        try {
            const [rows] = await connection.execute('SELECT * FROM vehiculo');
            return rows;
        } catch (error) {
            logger.error(`[Model]:Vehiculo:getAll Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },
};

export const MarcaVehiculo = {
    create: async ({ marca, descripcion }, connection = pool) => {
        try {
            const [result] = await connection.execute(
                'INSERT INTO marca_vehiculo (marca, descripcion) VALUES (?, ?)',
                [marca, descripcion]
            );
            return result.insertId;
        } catch (error) {
            logger.error(`[Model]:MarcaVehiculo:create Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    findById: async (id, connection = pool) => {
        try {
            const [rows] = await connection.execute(
                `SELECT id_marca, marca, descripcion
           FROM marca_vehiculo
           WHERE id_marca = ?`,
                [id]
            );
            return rows[0] || null;
        } catch (error) {
            logger.error(`[Model]:MarcaVehiculo:findById Error: ${error.message}`, { stack: error.stack });
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
                `UPDATE marca_vehiculo SET ${setClause} WHERE id_marca = ?`,
                values
            );
        } catch (error) {
            logger.error(`[Model]:MarcaVehiculo:update Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    softDelete: async (id, connection = pool) => {
        try {
            // Si deseas borrado físico, usa DELETE:
            await connection.execute(
                'DELETE FROM marca_vehiculo WHERE id_marca = ?',
                [id]
            );
        } catch (error) {
            logger.error(`[Model]:MarcaVehiculo:softDelete Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    getAll: async (connection = pool) => {
        try {
            const [rows] = await connection.execute(
                'SELECT id_marca, marca, descripcion FROM marca_vehiculo'
            );
            return rows;
        } catch (error) {
            logger.error(`[Model]:MarcaVehiculo:getAll Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },
};

export const Transmision = {
    create: async ({ tipo_transmision }, connection = pool) => {
        try {
            const [result] = await connection.execute(
                'INSERT INTO transmision (tipo_transmision) VALUES (?)',
                [tipo_transmision]
            );
            return result.insertId;
        } catch (error) {
            logger.error(`[Model]:Transmision:create Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    findById: async (id, connection = pool) => {
        try {
            const [rows] = await connection.execute(
                'SELECT idtransmision, tipo_transmision FROM transmision WHERE idtransmision = ?',
                [id]
            );
            return rows[0] || null;
        } catch (error) {
            logger.error(`[Model]:Transmision:findById Error: ${error.message}`, { stack: error.stack });
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
                `UPDATE transmision SET ${setClause} WHERE idtransmision = ?`,
                values
            );
        } catch (error) {
            logger.error(`[Model]:Transmision:update Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    softDelete: async (id, connection = pool) => {
        try {
            await connection.execute('DELETE FROM transmision WHERE idtransmision = ?', [id]);
        } catch (error) {
            logger.error(`[Model]:Transmision:softDelete Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    getAll: async (connection = pool) => {
        try {
            const [rows] = await connection.execute(
                'SELECT idtransmision, tipo_transmision FROM transmision'
            );
            return rows;
        } catch (error) {
            logger.error(`[Model]:Transmision:getAll Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },
};

export const Carroceria = {
    create: async ({ tipo_carroceria }, connection = pool) => {
        try {
            const [result] = await connection.execute(
                'INSERT INTO carroceria (tipo_carroceria) VALUES (?)',
                [tipo_carroceria]
            );
            return result.insertId;
        } catch (error) {
            logger.error(`[Model]:Carroceria:create Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    findById: async (id, connection = pool) => {
        try {
            const [rows] = await connection.execute(
                'SELECT idcarroceria, tipo_carroceria FROM carroceria WHERE idcarroceria = ?',
                [id]
            );
            return rows[0] || null;
        } catch (error) {
            logger.error(`[Model]:Carroceria:findById Error: ${error.message}`, { stack: error.stack });
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
                `UPDATE carroceria SET ${setClause} WHERE idcarroceria = ?`,
                values
            );
        } catch (error) {
            logger.error(`[Model]:Carroceria:update Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    softDelete: async (id, connection = pool) => {
        try {
            await connection.execute('DELETE FROM carroceria WHERE idcarroceria = ?', [id]);
        } catch (error) {
            logger.error(`[Model]:Carroceria:softDelete Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    getAll: async (connection = pool) => {
        try {
            const [rows] = await connection.execute(
                'SELECT idcarroceria, tipo_carroceria FROM carroceria'
            );
            return rows;
        } catch (error) {
            logger.error(`[Model]:Carroceria:getAll Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },
};

export const TipoVehiculo = {
    create: async ({ tipo_vehiculo, icono_vehiculo, idcarroceria }, connection = pool) => {
        try {
            const [result] = await connection.execute(
                `INSERT INTO tipo_vehiculo (tipo_vehiculo, icono_vehiculo, idcarroceria)
           VALUES (?, ?, ?)`,
                [tipo_vehiculo, icono_vehiculo, idcarroceria]
            );
            return result.insertId;
        } catch (error) {
            logger.error(`[Model]:TipoVehiculo:create Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    findById: async (id, connection = pool) => {
        try {
            const [rows] = await connection.execute(
                `SELECT idtipo_vehiculo, tipo_vehiculo, icono_vehiculo, idcarroceria
           FROM tipo_vehiculo
           WHERE idtipo_vehiculo = ?`,
                [id]
            );
            return rows[0] || null;
        } catch (error) {
            logger.error(`[Model]:TipoVehiculo:findById Error: ${error.message}`, { stack: error.stack });
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
                `UPDATE tipo_vehiculo
           SET ${setClause}
           WHERE idtipo_vehiculo = ?`,
                values
            );
        } catch (error) {
            logger.error(`[Model]:TipoVehiculo:update Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    softDelete: async (id, connection = pool) => {
        try {
            await connection.execute('DELETE FROM tipo_vehiculo WHERE idtipo_vehiculo = ?', [id]);
        } catch (error) {
            logger.error(`[Model]:TipoVehiculo:softDelete Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    getAll: async (connection = pool) => {
        try {
            const [rows] = await connection.execute(
                `SELECT idtipo_vehiculo, tipo_vehiculo, icono_vehiculo, idcarroceria
           FROM tipo_vehiculo`
            );
            return rows;
        } catch (error) {
            logger.error(`[Model]:TipoVehiculo:getAll Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },
};

export const Combustible = {
    create: async ({ tipo_combustible }, connection = pool) => {
        try {
            const [result] = await connection.execute(
                'INSERT INTO combustible (tipo_combustible) VALUES (?)',
                [tipo_combustible]
            );
            return result.insertId;
        } catch (error) {
            logger.error(`[Model]:Combustible:create Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    findById: async (id, connection = pool) => {
        try {
            const [rows] = await connection.execute(
                `SELECT idcombustible, tipo_combustible
           FROM combustible
           WHERE idcombustible = ?`,
                [id]
            );
            return rows[0] || null;
        } catch (error) {
            logger.error(`[Model]:Combustible:findById Error: ${error.message}`, { stack: error.stack });
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
                `UPDATE combustible SET ${setClause} WHERE idcombustible = ?`,
                values
            );
        } catch (error) {
            logger.error(`[Model]:Combustible:update Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    softDelete: async (id, connection = pool) => {
        try {
            await connection.execute('DELETE FROM combustible WHERE idcombustible = ?', [id]);
        } catch (error) {
            logger.error(`[Model]:Combustible:softDelete Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    getAll: async (connection = pool) => {
        try {
            const [rows] = await connection.execute(
                'SELECT idcombustible, tipo_combustible FROM combustible'
            );
            return rows;
        } catch (error) {
            logger.error(`[Model]:Combustible:getAll Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },
};

export const Asientos = {
    create: async ({
        fila,
        columna,
        tipo_asiento,
        estado_asiento,
        caracteristica,
        idvehiculo
    }, connection = pool) => {
        try {
            const [result] = await connection.execute(
                `INSERT INTO asientos
           (fila, columna, tipo_asiento, estado_asiento, caracteristica, idvehiculo)
           VALUES (?, ?, ?, ?, ?, ?)`,
                [fila, columna, tipo_asiento, estado_asiento, caracteristica, idvehiculo]
            );
            return result.insertId;
        } catch (error) {
            logger.error(`[Model]:Asientos:create Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    findById: async (id, connection = pool) => {
        try {
            const [rows] = await connection.execute(
                `SELECT *
           FROM asientos
           WHERE idAsiento = ?`,
                [id]
            );
            return rows[0] || null;
        } catch (error) {
            logger.error(`[Model]:Asientos:findById Error: ${error.message}`, { stack: error.stack });
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
                `UPDATE asientos
           SET ${setClause}
           WHERE idAsiento = ?`,
                values
            );
        } catch (error) {
            logger.error(`[Model]:Asientos:update Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    softDelete: async (id, connection = pool) => {
        try {
            // Borrado físico:
            await connection.execute('DELETE FROM asientos WHERE idAsiento = ?', [id]);
        } catch (error) {
            logger.error(`[Model]:Asientos:softDelete Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    getAll: async (connection = pool) => {
        try {
            const [rows] = await connection.execute('SELECT * FROM asientos');
            return rows;
        } catch (error) {
            logger.error(`[Model]:Asientos:getAll Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },
};