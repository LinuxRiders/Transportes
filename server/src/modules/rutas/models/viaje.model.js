import pool from '../../../config/db.js';
import logger from '../../../utils/logger.js';

export const Viaje = {
  // CREATE
  create: async (
    { ruta_id, vehiculo_id, terminal_id_origen, terminal_id_destino, fecha_inicio, fecha_fin, estado, created_by },
    connection = pool
  ) => {
    try {
      const [result] = await connection.execute(
        `INSERT INTO viajes (ruta_id, vehiculo_id, terminal_id_origen, terminal_id_destino, fecha_inicio, fecha_fin, estado, created_at, created_by)
         VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?)`,
        [ruta_id, vehiculo_id, terminal_id_origen, terminal_id_destino, fecha_inicio, fecha_fin, estado, created_by]
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
