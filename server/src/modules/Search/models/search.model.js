import pool from '../../config/db.js';
import logger from '../../utils/logger.js';

export const Search = {
    find: async ({
        marca,
        modelo,
        anio_fabricacion,
        estado,
        ruta,
        estado_viaje,
        fecha_inicio,
        terminal_nombre,
        ciudad
    }) => {
        try {
            const filters = [];
            const values = [];

            // Construir filtros para vehículos
            if (marca) {
                filters.push("v.marca LIKE ?");
                values.push(`%${marca}%`);
            }
            if (modelo) {
                filters.push("v.modelo LIKE ?");
                values.push(`%${modelo}%`);
            }
            if (anio_fabricacion) {
                filters.push("v.anio_fabricacion = ?");
                values.push(anio_fabricacion);
            }
            if (estado) {
                filters.push("v.estado = ?");
                values.push(estado);
            }

            // Construir filtros para viajes
            if (ruta) {
                filters.push("r.nombre_ruta LIKE ?");
                values.push(`%${ruta}%`);
            }
            if (estado_viaje) {
                filters.push("vi.estado = ?");
                values.push(estado_viaje);
            }
            if (fecha_inicio) {
                filters.push("DATE(vi.fecha_inicio) = ?");
                values.push(fecha_inicio);
            }

            // Construir filtros para terminales
            if (terminal_nombre) {
                filters.push("t.nombre LIKE ?");
                values.push(`%${terminal_nombre}%`);
            }
            if (ciudad) {
                filters.push("c.nombre LIKE ?");
                values.push(`%${ciudad}%`);
            }

            // Query dinámica
            const query = `
        SELECT 
          v.idvehiculo AS vehiculo_id,
          v.marca AS vehiculo_marca,
          v.modelo AS vehiculo_modelo,
          v.anio_fabricacion AS vehiculo_anio,
          v.estado AS vehiculo_estado,
          vi.id_viaje AS viaje_id,
          r.nombre_ruta AS viaje_ruta,
          vi.estado AS viaje_estado,
          vi.fecha_inicio AS viaje_fecha_inicio,
          t.id_terminal AS terminal_id,
          t.nombre AS terminal_nombre,
          c.nombre AS terminal_ciudad
        FROM vehiculo v
        LEFT JOIN viajes vi ON v.idvehiculo = vi.vehiculo_id
        LEFT JOIN rutas r ON vi.ruta_id = r.id_rutas
        LEFT JOIN terminales t ON vi.terminal_id_origen = t.id_terminal
        LEFT JOIN ciudades c ON t.id_ciudad = c.id_ciudad
        ${filters.length > 0 ? `WHERE ${filters.join(" AND ")}` : ""}
      `;

            const [results] = await pool.query(query, values);
            return results;
        } catch (error) {
            logger.error(`[Model]:Search:find Error: ${error.message}`, { stack: error.stack });
            throw error;
        }
    }
};
