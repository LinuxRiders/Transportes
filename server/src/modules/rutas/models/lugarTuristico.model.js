import pool from '../../../config/db.js';
import logger from '../../../utils/logger.js';

export const LugarTuristico = {
  // CREATE
  create: async ({ nombre, descripcion, ubicacion, categoria_id, created_by }, connection = pool) => {
    try {
      const [result] = await connection.execute(
        `INSERT INTO lugares_turisticos (nombre, descripcion, ubicacion, categoria_id, created_at, created_by)
         VALUES (?, ?, ?, ?, NOW(), ?)`,
        [nombre, descripcion, ubicacion, categoria_id, created_by]
      );
      return result.insertId;
    } catch (error) {
      logger.error(`[Model]:LugarTuristico:create Error: ${error.message}`, { stack: error.stack });
      throw error;
    }
  },

  // FIND BY ID
  findById: async (id, connection = pool) => {
    try {
      const [rows] = await connection.execute(
        `SELECT * FROM lugares_turisticos WHERE id_lugares_turisticos = ? AND deleted_at IS NULL`,
        [id]
      );
      return rows[0] || null;
    } catch (error) {
      logger.error(`[Model]:LugarTuristico:findById Error: ${error.message}`, { stack: error.stack });
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
        `UPDATE lugares_turisticos SET ${setClause} WHERE id_lugares_turisticos = ? AND deleted_at IS NULL`,
        values
      );
    } catch (error) {
      logger.error(`[Model]:LugarTuristico:update Error: ${error.message}`, { stack: error.stack });
      throw error;
    }
  },

  // DELETE
  softDelete: async (id, updated_by, connection = pool) => {
    try {
      await connection.execute(
        `UPDATE lugares_turisticos SET deleted_at = NOW(), updated_by = ? WHERE id_lugares_turisticos = ? AND deleted_at IS NULL`,
        [updated_by, id]
      );
    } catch (error) {
      logger.error(`[Model]:LugarTuristico:softDelete Error: ${error.message}`, { stack: error.stack });
      throw error;
    }
  },

  // GET ALL
  getAll: async (connection = pool) => {
    try {
      const [rows] = await connection.execute(`SELECT * FROM lugares_turisticos WHERE deleted_at IS NULL`);
      return rows;
    } catch (error) {
      logger.error(`[Model]:LugarTuristico:getAll Error: ${error.message}`, { stack: error.stack });
      throw error;
    }
  }
};
