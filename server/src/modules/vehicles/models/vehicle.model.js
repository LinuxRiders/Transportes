import pool from '../../../config/db.js';
import logger from '../../../utils/logger.js';

export const Vehiculo = {
    // CREATE
    create: async (
        {
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
            idcombustible,
            created_by = null// Auditoría
        },
        connection = pool
    ) => {
        try {
            const [result] = await connection.execute(
                `INSERT INTO vehiculo (
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
            idcombustible,
            created_at,
            created_by
          )
          VALUES (
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            NOW(),         -- created_at
            ?
          )`,
                [
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
                    idcombustible,
                    created_by
                ]
            );
            return result.insertId;
        } catch (error) {
            logger.error(`[Model]:Vehiculo:create Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // FIND BY ID (excluye borrados lógicamente)
    findById: async (id, connection = pool) => {
        try {
            const [rows] = await connection.execute(
                `SELECT *
           FROM vehiculo
           WHERE idvehiculo = ?
             AND deleted_at IS NULL`,
                [id]
            );
            return rows[0] || null;
        } catch (error) {
            logger.error(`[Model]:Vehiculo:findById Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // UPDATE (usa updated_at = NOW() y recibe updated_by como param separado)
    update: async (id, fields, updated_by, connection = pool) => {
        try {
            // 1. Extraemos campos a actualizar
            const keys = Object.keys(fields);      // ej: ["placa", "modelo"]
            const values = Object.values(fields);  // ej: ["ABC-123", "Sedán"]

            // 2. Construimos el setClause dinámicamente
            let setClause = "";
            if (keys.length > 0) {
                // Ej: "placa = ?, modelo = ?"
                setClause = keys.map((k) => `${k} = ?`).join(", ") + ", ";
            }

            // Agregamos updated_at y updated_by
            setClause += "updated_at = NOW(), updated_by = ?";

            // Agregamos updated_by a values
            values.push(updated_by);

            // Agregamos el ID
            values.push(id);

            await connection.execute(
                `UPDATE vehiculo
           SET ${setClause}
           WHERE idvehiculo = ?
             AND deleted_at IS NULL`,
                values
            );
        } catch (error) {
            logger.error(`[Model]:Vehiculo:update Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // BORRADO LÓGICO
    softDelete: async (id, userId, connection = pool) => {
        try {
            await connection.execute(
                `UPDATE vehiculo
           SET deleted_at = NOW(),
               updated_by = ?
           WHERE idvehiculo = ?
             AND deleted_at IS NULL`,
                [userId, id]
            );
        } catch (error) {
            logger.error(`[Model]:Vehiculo:softDelete Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // GET ALL (excluye borrados lógicamente)
    getAll: async (connection = pool) => {
        try {
            const [rows] = await connection.execute(
                `SELECT *
           FROM vehiculo
           WHERE deleted_at IS NULL`
            );
            return rows;
        } catch (error) {
            logger.error(`[Model]:Vehiculo:getAll Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    }
};

export const MarcaVehiculo = {
    // CREATE
    create: async ({ marca, descripcion, created_by = null }, connection = pool) => {
        try {
            const [result] = await connection.execute(
                `INSERT INTO marca_vehiculo (
            marca,
            descripcion,
            created_at,
            created_by
          )
          VALUES (
            ?,
            ?,
            NOW(),
            ?
          )`,
                [marca, descripcion, created_by]
            );
            return result.insertId;
        } catch (error) {
            logger.error(`[Model]:MarcaVehiculo:create Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // FIND BY ID
    findById: async (id, connection = pool) => {
        try {
            const [rows] = await connection.execute(
                `SELECT id_marca, marca, descripcion
           FROM marca_vehiculo
           WHERE id_marca = ?
             AND deleted_at IS NULL`,
                [id]
            );
            return rows[0] || null;
        } catch (error) {
            logger.error(`[Model]:MarcaVehiculo:findById Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // UPDATE (updated_at = NOW(), updated_by como param)
    update: async (id, fields, updated_by, connection = pool) => {
        try {
            const keys = Object.keys(fields);
            const values = Object.values(fields);

            let setClause = "";
            if (keys.length > 0) {
                setClause = keys.map((k) => `${k} = ?`).join(", ") + ", ";
            }

            setClause += "updated_at = NOW(), updated_by = ?";
            values.push(updated_by, id);

            await connection.execute(
                `UPDATE marca_vehiculo
           SET ${setClause}
           WHERE id_marca = ?
             AND deleted_at IS NULL`,
                values
            );
        } catch (error) {
            logger.error(`[Model]:MarcaVehiculo:update Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // BORRADO LÓGICO
    softDelete: async (id, userId, connection = pool) => {
        try {
            await connection.execute(
                `UPDATE marca_vehiculo
           SET deleted_at = NOW(),
               updated_by = ?
           WHERE id_marca = ?
             AND deleted_at IS NULL`,
                [userId, id]
            );
        } catch (error) {
            logger.error(`[Model]:MarcaVehiculo:softDelete Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // GET ALL
    getAll: async (connection = pool) => {
        try {
            const [rows] = await connection.execute(
                `SELECT id_marca, marca, descripcion
           FROM marca_vehiculo
           WHERE deleted_at IS NULL`
            );
            return rows;
        } catch (error) {
            logger.error(`[Model]:MarcaVehiculo:getAll Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    }
};

export const Transmision = {
    // CREATE
    create: async ({ tipo_transmision, created_by = null }, connection = pool) => {
        try {
            const [result] = await connection.execute(
                `INSERT INTO transmision (
            tipo_transmision,
            created_at,
            created_by
          )
          VALUES (
            ?,
            NOW(),
            ?
          )`,
                [tipo_transmision, created_by]
            );
            return result.insertId;
        } catch (error) {
            logger.error(`[Model]:Transmision:create Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // FIND BY ID
    findById: async (id, connection = pool) => {
        try {
            const [rows] = await connection.execute(
                `SELECT idtransmision, tipo_transmision
           FROM transmision
           WHERE idtransmision = ?
             AND deleted_at IS NULL`,
                [id]
            );
            return rows[0] || null;
        } catch (error) {
            logger.error(`[Model]:Transmision:findById Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // UPDATE
    update: async (id, fields, updated_by, connection = pool) => {
        try {
            const keys = Object.keys(fields);
            const values = Object.values(fields);

            let setClause = "";
            if (keys.length > 0) {
                setClause = keys.map((k) => `${k} = ?`).join(", ") + ", ";
            }

            setClause += "updated_at = NOW(), updated_by = ?";
            values.push(updated_by, id);

            await connection.execute(
                `UPDATE transmision
           SET ${setClause}
           WHERE idtransmision = ?
             AND deleted_at IS NULL`,
                values
            );
        } catch (error) {
            logger.error(`[Model]:Transmision:update Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // SOFT DELETE
    softDelete: async (id, userId, connection = pool) => {
        try {
            await connection.execute(
                `UPDATE transmision
           SET deleted_at = NOW(),
               updated_by = ?
           WHERE idtransmision = ?
             AND deleted_at IS NULL`,
                [userId, id]
            );
        } catch (error) {
            logger.error(`[Model]:Transmision:softDelete Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // GET ALL
    getAll: async (connection = pool) => {
        try {
            const [rows] = await connection.execute(
                `SELECT idtransmision, tipo_transmision
           FROM transmision
           WHERE deleted_at IS NULL`
            );
            return rows;
        } catch (error) {
            logger.error(`[Model]:Transmision:getAll Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    }
};

export const Carroceria = {
    // CREATE
    create: async ({ tipo_carroceria, created_by = null }, connection = pool) => {
        try {
            const [result] = await connection.execute(
                `INSERT INTO carroceria (
            tipo_carroceria,
            created_at,
            created_by
          )
          VALUES (
            ?,
            NOW(),
            ?
          )`,
                [tipo_carroceria, created_by]
            );
            return result.insertId;
        } catch (error) {
            logger.error(`[Model]:Carroceria:create Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // FIND BY ID
    findById: async (id, connection = pool) => {
        try {
            const [rows] = await connection.execute(
                `SELECT idcarroceria, tipo_carroceria
           FROM carroceria
           WHERE idcarroceria = ?
             AND deleted_at IS NULL`,
                [id]
            );
            return rows[0] || null;
        } catch (error) {
            logger.error(`[Model]:Carroceria:findById Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // UPDATE
    update: async (id, fields, updated_by, connection = pool) => {
        try {
            const keys = Object.keys(fields);
            const values = Object.values(fields);

            let setClause = "";
            if (keys.length > 0) {
                setClause = keys.map((k) => `${k} = ?`).join(", ") + ", ";
            }

            setClause += "updated_at = NOW(), updated_by = ?";
            values.push(updated_by, id);

            await connection.execute(
                `UPDATE carroceria
           SET ${setClause}
           WHERE idcarroceria = ?
             AND deleted_at IS NULL`,
                values
            );
        } catch (error) {
            logger.error(`[Model]:Carroceria:update Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // SOFT DELETE
    softDelete: async (id, userId, connection = pool) => {
        try {
            await connection.execute(
                `UPDATE carroceria
           SET deleted_at = NOW(),
               updated_by = ?
           WHERE idcarroceria = ?
             AND deleted_at IS NULL`,
                [userId, id]
            );
        } catch (error) {
            logger.error(`[Model]:Carroceria:softDelete Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // GET ALL
    getAll: async (connection = pool) => {
        try {
            const [rows] = await connection.execute(
                `SELECT idcarroceria, tipo_carroceria
           FROM carroceria
           WHERE deleted_at IS NULL`
            );
            return rows;
        } catch (error) {
            logger.error(`[Model]:Carroceria:getAll Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    }
};

export const TipoVehiculo = {
    // CREATE
    create: async (
        {
            tipo_vehiculo,
            idcarroceria,
            created_by = null
        },
        connection = pool
    ) => {
        try {
            const [result] = await connection.execute(
                `INSERT INTO tipo_vehiculo (
            tipo_vehiculo,
            idcarroceria,
            created_at,
            created_by
          )
          VALUES (
            ?,
            ?,
            NOW(),
            ?
          )`,
                [tipo_vehiculo, idcarroceria, created_by]
            );
            return result.insertId;
        } catch (error) {
            logger.error(`[Model]:TipoVehiculo:create Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // FIND BY ID
    findById: async (id, connection = pool) => {
        try {
            const [rows] = await connection.execute(
                `SELECT idtipo_vehiculo, tipo_vehiculo, icono_vehiculo, idcarroceria
           FROM tipo_vehiculo
           WHERE idtipo_vehiculo = ?
             AND deleted_at IS NULL`,
                [id]
            );
            return rows[0] || null;
        } catch (error) {
            logger.error(`[Model]:TipoVehiculo:findById Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // UPDATE
    update: async (id, fields, updated_by, connection = pool) => {
        try {
            const keys = Object.keys(fields);
            const values = Object.values(fields);

            let setClause = "";
            if (keys.length > 0) {
                setClause = keys.map((k) => `${k} = ?`).join(", ") + ", ";
            }

            setClause += "updated_at = NOW(), updated_by = ?";
            values.push(updated_by, id);

            await connection.execute(
                `UPDATE tipo_vehiculo
           SET ${setClause}
           WHERE idtipo_vehiculo = ?
             AND deleted_at IS NULL`,
                values
            );
        } catch (error) {
            logger.error(`[Model]:TipoVehiculo:update Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // SOFT DELETE
    softDelete: async (id, userId, connection = pool) => {
        try {
            await connection.execute(
                `UPDATE tipo_vehiculo
           SET deleted_at = NOW(),
               updated_by = ?
           WHERE idtipo_vehiculo = ?
             AND deleted_at IS NULL`,
                [userId, id]
            );
        } catch (error) {
            logger.error(`[Model]:TipoVehiculo:softDelete Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // GET ALL
    getAll: async (connection = pool) => {
        try {
            const [rows] = await connection.execute(
                `SELECT idtipo_vehiculo, tipo_vehiculo, icono_vehiculo, idcarroceria
           FROM tipo_vehiculo
           WHERE deleted_at IS NULL`
            );
            return rows;
        } catch (error) {
            logger.error(`[Model]:TipoVehiculo:getAll Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    }
};

export const Combustible = {
    // CREATE
    create: async ({ tipo_combustible, created_by = null }, connection = pool) => {
        try {
            const [result] = await connection.execute(
                `INSERT INTO combustible (
            tipo_combustible,
            created_at,
            created_by
          )
          VALUES (
            ?,
            NOW(),
            ?
          )`,
                [tipo_combustible, created_by]
            );
            return result.insertId;
        } catch (error) {
            logger.error(`[Model]:Combustible:create Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // FIND BY ID
    findById: async (id, connection = pool) => {
        try {
            const [rows] = await connection.execute(
                `SELECT idcombustible, tipo_combustible
           FROM combustible
           WHERE idcombustible = ?
             AND deleted_at IS NULL`,
                [id]
            );
            return rows[0] || null;
        } catch (error) {
            logger.error(`[Model]:Combustible:findById Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // UPDATE
    update: async (id, fields, updated_by, connection = pool) => {
        try {
            const keys = Object.keys(fields);
            const values = Object.values(fields);

            let setClause = "";
            if (keys.length > 0) {
                setClause = keys.map(k => `${k} = ?`).join(", ") + ", ";
            }

            setClause += "updated_at = NOW(), updated_by = ?";
            values.push(updated_by, id);

            await connection.execute(
                `UPDATE combustible
           SET ${setClause}
           WHERE idcombustible = ?
             AND deleted_at IS NULL`,
                values
            );
        } catch (error) {
            logger.error(`[Model]:Combustible:update Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // SOFT DELETE
    softDelete: async (id, userId, connection = pool) => {
        try {
            await connection.execute(
                `UPDATE combustible
           SET deleted_at = NOW(),
               updated_by = ?
           WHERE idcombustible = ?
             AND deleted_at IS NULL`,
                [userId, id]
            );
        } catch (error) {
            logger.error(`[Model]:Combustible:softDelete Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // GET ALL
    getAll: async (connection = pool) => {
        try {
            const [rows] = await connection.execute(
                `SELECT idcombustible, tipo_combustible
           FROM combustible
           WHERE deleted_at IS NULL`
            );
            return rows;
        } catch (error) {
            logger.error(`[Model]:Combustible:getAll Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    }
};

export const Asientos = {
    // CREATE
    create: async (
        {
            fila,
            columna,
            tipo_asiento,
            estado_asiento,
            caracteristica,
            idvehiculo,
            created_by = null
        },
        connection = pool
    ) => {
        try {
            const [result] = await connection.execute(
                `INSERT INTO asientos (
            fila,
            columna,
            tipo_asiento,
            estado_asiento,
            caracteristica,
            idvehiculo,
            created_at,
            created_by
          )
          VALUES (?,?,?, ?,?,?,NOW(),?)`,
                [fila, columna, tipo_asiento, estado_asiento, caracteristica, idvehiculo, created_by]
            );
            return result.insertId;
        } catch (error) {
            logger.error(`[Model]:Asientos:create Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // FIND BY ID
    findById: async (id, connection = pool) => {
        try {
            const [rows] = await connection.execute(
                `SELECT *
           FROM asientos
           WHERE idAsiento = ?
             AND deleted_at IS NULL`,
                [id]
            );
            return rows[0] || null;
        } catch (error) {
            logger.error(`[Model]:Asientos:findById Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // UPDATE
    update: async (id, fields, updated_by, connection = pool) => {
        try {
            const keys = Object.keys(fields);
            const values = Object.values(fields);

            let setClause = "";
            if (keys.length > 0) {
                setClause = keys.map((k) => `${k} = ?`).join(", ") + ", ";
            }

            // Agregamos updated_at y updated_by
            setClause += "updated_at = NOW(), updated_by = ?";
            values.push(updated_by, id);

            await connection.execute(
                `UPDATE asientos
           SET ${setClause}
           WHERE idAsiento = ?
             AND deleted_at IS NULL`,
                values
            );
        } catch (error) {
            logger.error(`[Model]:Asientos:update Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // SOFT DELETE
    softDelete: async (id, userId, connection = pool) => {
        try {
            await connection.execute(
                `UPDATE asientos
           SET deleted_at = NOW(),
               updated_by = ?
           WHERE idAsiento = ?
             AND deleted_at IS NULL`,
                [userId, id]
            );
        } catch (error) {
            logger.error(`[Model]:Asientos:softDelete Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // GET ALL
    getAll: async (connection = pool) => {
        try {
            const [rows] = await connection.execute(
                `SELECT *
           FROM asientos
           WHERE deleted_at IS NULL`
            );
            return rows;
        } catch (error) {
            logger.error(`[Model]:Asientos:getAll Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    },

    // GET BY Vehicle
    getByVehicle: async (vehicleId, connection = pool) => {
        try {
            const [rows] = await connection.execute(
                `SELECT *
           FROM asientos
           WHERE idvehiculo = ? AND deleted_at IS NULL`, [vehicleId]
            );
            return rows;
        } catch (error) {
            logger.error(`[Model]:Asientos:getAll Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    }
};