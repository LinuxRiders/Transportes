import pool from '../../../config/db.js';
import logger from '../../../utils/logger.js';

export const Ruta = {
  // CREATE
  create: async ({ nombre_ruta, descripcion, duracion, precio, created_by }, connection = pool) => {
    try {
      const [result] = await connection.execute(
        `INSERT INTO rutas (nombre_ruta, descripcion, duracion, precio, created_at, created_by)
         VALUES (?, ?, ?, ?, NOW(), ?)`,
        [nombre_ruta, descripcion, duracion, precio, created_by]
      );
      return result.insertId;
    } catch (error) {
      logger.error(`[Model]:Ruta:create Error: ${error.message}`, { stack: error.stack });
      throw error;
    }
  },

  // FIND BY ID
  findById: async (id, connection = pool) => {
    try {
      const [rows] = await connection.execute(
        `SELECT * FROM rutas WHERE id_rutas = ? AND deleted_at IS NULL`,
        [id]
      );
      return rows[0] || null;
    } catch (error) {
      logger.error(`[Model]:Ruta:findById Error: ${error.message}`, { stack: error.stack });
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
        `UPDATE rutas SET ${setClause} WHERE id_rutas = ? AND deleted_at IS NULL`,
        values
      );
    } catch (error) {
      logger.error(`[Model]:Ruta:update Error: ${error.message}`, { stack: error.stack });
      throw error;
    }
  },

  // DELETE
  softDelete: async (id, updated_by, connection = pool) => {
    try {
      await connection.execute(
        `UPDATE rutas SET deleted_at = NOW(), updated_by = ? WHERE id_rutas = ? AND deleted_at IS NULL`,
        [updated_by, id]
      );
    } catch (error) {
      logger.error(`[Model]:Ruta:softDelete Error: ${error.message}`, { stack: error.stack });
      throw error;
    }
  },

  // GET ALL
  getAll: async (connection = pool) => {
    try {
      const [rows] = await connection.execute(`SELECT * FROM rutas WHERE deleted_at IS NULL`);
      return rows;
    } catch (error) {
      logger.error(`[Model]:Ruta:getAll Error: ${error.message}`, { stack: error.stack });
      throw error;
    }
  }
};
