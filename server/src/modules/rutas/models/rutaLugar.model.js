import pool from '../../../config/db.js';
import logger from '../../../utils/logger.js';

export const RutaLugar = {
  // CREATE
  create: async ({ ruta_id, lugar_turistico_id, orden_visita, tiempo_estancia, created_by }, connection = pool) => {
    try {
      const [result] = await connection.execute(
        `INSERT INTO ruta_lugares (ruta_id, lugar_turistico_id, orden_visita, tiempo_estancia, created_at, created_by)
         VALUES (?, ?, ?, ?, NOW(), ?)`,
        [ruta_id, lugar_turistico_id, orden_visita, tiempo_estancia, created_by]
      );
      return result.insertId;
    } catch (error) {
      logger.error(`[Model]:RutaLugar:create Error: ${error.message}`, { stack: error.stack });
      throw error;
    }
  },

  // FIND BY ID
  findById: async (id, connection = pool) => {
    try {
      const [rows] = await connection.execute(
        `SELECT * FROM ruta_lugares WHERE id_ruta_lugares = ? AND deleted_at IS NULL`,
        [id]
      );
      return rows[0] || null;
    } catch (error) {
      logger.error(`[Model]:RutaLugar:findById Error: ${error.message}`, { stack: error.stack });
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
        `UPDATE ruta_lugares SET ${setClause} WHERE id_ruta_lugares = ? AND deleted_at IS NULL`,
        values
      );
    } catch (error) {
      logger.error(`[Model]:RutaLugar:update Error: ${error.message}`, { stack: error.stack });
      throw error;
    }
  },

  // DELETE
  softDelete: async (id, updated_by, connection = pool) => {
    try {
      await connection.execute(
        `UPDATE ruta_lugares SET deleted_at = NOW(), updated_by = ? WHERE id_ruta_lugares = ? AND deleted_at IS NULL`,
        [updated_by, id]
      );
    } catch (error) {
      logger.error(`[Model]:RutaLugar:softDelete Error: ${error.message}`, { stack: error.stack });
      throw error;
    }
  },

  // GET ALL
  getAll: async (connection = pool) => {
    try {
      const [rows] = await connection.execute(`SELECT * FROM ruta_lugares WHERE deleted_at IS NULL`);
      return rows;
    } catch (error) {
      logger.error(`[Model]:RutaLugar:getAll Error: ${error.message}`, { stack: error.stack });
      throw error;
    }
  }
};
