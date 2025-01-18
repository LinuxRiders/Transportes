import pool from "../../../config/db.js";
import logger from "../../../utils/logger.js";

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
    ciudad,
    limit = 10,
    page = 1,
    orderBy = "id",
    order = "asc",
  }) => {
    try {
      const filters = [];
      const values = [];

      // Construir filtros
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
      if (terminal_nombre) {
        filters.push("t.nombre LIKE ?");
        values.push(`%${terminal_nombre}%`);
      }
      if (ciudad) {
        filters.push("c.nombre LIKE ?");
        values.push(`%${ciudad}%`);
      }

      // Paginación y orden
      const offset = (page - 1) * limit;
      const orderClause = `ORDER BY ${orderBy} ${order.toUpperCase()}`;
      const limitClause = `LIMIT ? OFFSET ?`;
      values.push(parseInt(limit), parseInt(offset));

      // Query
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
          ${orderClause}
          ${limitClause}
        `;

      const [results] = await pool.query(query, values);
      return results;
    } catch (error) {
      logger.error(`[Model]:Search:find Error: ${error.message}`, {
        stack: error.stack,
      });
      throw error;
    }
  },

  // Búsqueda de lugares turísticos por categoría
  findLugaresByCategoria: async ({
    categoria_id,
    nombre_categoria,
    nombre_lugar,
    limit = 10,
    page = 1,
    orderBy = "id_lugares_turisticos",
    order = "asc",
  }) => {
    try {
      const filters = [];
      const values = [];

      // Filtro por categoria_id si se proporciona
      if (categoria_id) {
        filters.push("l.categoria_id = ?");
        values.push(categoria_id);
      }

      // Filtro por nombre_categoria si se proporciona
      if (nombre_categoria) {
        filters.push("c.nombre_categoria LIKE ?");
        values.push(`%${nombre_categoria}%`);
      }

      // Filtro por nombre de lugar
      if (nombre_lugar) {
        filters.push("l.nombre LIKE ?");
        values.push(`%${nombre_lugar}%`);
      }

      // Paginación y orden
      const offset = (page - 1) * limit;
      const orderClause = `ORDER BY ${orderBy} ${order.toUpperCase()}`;
      const limitClause = `LIMIT ? OFFSET ?`;
      values.push(parseInt(limit), parseInt(offset));

      // Query para buscar lugares turísticos por categoría (id o nombre)
      const query = `
          SELECT 
            l.id_lugares_turisticos,
            l.nombre AS lugar_nombre,
            l.descripcion AS lugar_descripcion,
            l.ubicacion AS lugar_ubicacion,
            c.id_categoria_lugares,
            c.nombre_categoria AS categoria_nombre,
            c.descripcion AS categoria_descripcion
          FROM lugares_turisticos l
          JOIN categorias_lugares c ON l.categoria_id = c.id_categoria_lugares
          ${filters.length > 0 ? `WHERE ${filters.join(" AND ")}` : ""}
          ${orderClause}
          ${limitClause}
        `;

      const [results] = await pool.query(query, values);
      return results;
    } catch (error) {
      logger.error(
        `[Model]:Search:findLugaresPorCategoria Error: ${error.message}`,
        { stack: error.stack }
      );
      throw error;
    }
  },
};
