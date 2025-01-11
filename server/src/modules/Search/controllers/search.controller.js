import logger from '../../../utils/logger.js';
import { Search } from '../models/search.model.js';

export const search = async (req, res, next) => {
    try {
        const {
            marca,
            modelo,
            anio_fabricacion,
            estado,
            ruta,
            estado_viaje,
            fecha_inicio,
            terminal_nombre,
            ciudad,
            limit,
            page,
            orderBy,
            order
        } = req.query;

        // Llamar al modelo con los parámetros proporcionados
        const results = await Search.find({
            marca,
            modelo,
            anio_fabricacion,
            estado,
            ruta,
            estado_viaje,
            fecha_inicio,
            terminal_nombre,
            ciudad,
            limit,
            page,
            orderBy,
            order
        });

        logger.info(`SearchController:search Retrieved ${results.length} results`);
        res.json({ data: results });
    } catch (error) {
        logger.error(`SearchController:search Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};
