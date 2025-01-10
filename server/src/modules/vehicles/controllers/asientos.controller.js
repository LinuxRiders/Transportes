import { Asientos } from '../models/vehicle.model.js';
import logger from '../../../utils/logger.js';
import pool from '../../../config/db.js';

/**
 * Crea un asiento individual.
 */
export const createAsiento = async (req, res, next) => {
    try {
        const {
            fila,
            columna,
            tipo_asiento,
            estado_asiento,
            caracteristica,
            idvehiculo,
            created_by
        } = req.body;

        const idAsiento = await Asientos.create({
            fila,
            columna,
            tipo_asiento,
            estado_asiento,
            caracteristica,
            idvehiculo,
            created_by
        });

        const asiento = await Asientos.findById(idAsiento);
        logger.info(`AsientosController:createAsiento Created id=${idAsiento}`);
        res.status(201).json({ data: asiento });
    } catch (error) {
        logger.error(`AsientosController:createAsiento Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

/**
 * Muestra la info de un asiento por ID.
 */
export const getAsiento = async (req, res, next) => {
    try {
        const asiento = await Asientos.findById(req.params.id);
        if (!asiento) {
            logger.warn(`AsientosController:getAsiento Not found id=${req.params.id}`);
            return res.status(404).json({ error: 'Asiento not found' });
        }

        res.json({ data: asiento });
    } catch (error) {
        logger.error(`AsientosController:getAsiento Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

/**
 * Actualiza la info de un asiento.
 */
export const updateAsiento = async (req, res, next) => {
    try {
        const asiento = await Asientos.findById(req.params.id);
        if (!asiento) {
            logger.warn(`AsientosController:updateAsiento Not found id=${req.params.id}`);
            return res.status(404).json({ error: 'Asiento not found' });
        }

        const fields = {};
        if (req.body.fila) fields.fila = req.body.fila;
        if (req.body.columna) fields.columna = req.body.columna;
        if (req.body.tipo_asiento) fields.tipo_asiento = req.body.tipo_asiento;
        if (req.body.estado_asiento) fields.estado_asiento = req.body.estado_asiento;
        if (req.body.caracteristica) fields.caracteristica = req.body.caracteristica;
        if (req.body.idvehiculo) fields.idvehiculo = req.body.idvehiculo;

        const updated_by = req.body.updated_by || null;
        if (Object.keys(fields).length > 0) {
            await Asientos.update(req.params.id, fields, updated_by);
        }

        const updatedAsiento = await Asientos.findById(req.params.id);
        logger.info(`AsientosController:updateAsiento Updated id=${req.params.id}`);
        res.json({ data: updatedAsiento });
    } catch (error) {
        logger.error(`AsientosController:updateAsiento Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

/**
 * Elimina un asiento (físico o lógico).
 */
export const deleteAsiento = async (req, res, next) => {
    try {
        const asiento = await Asientos.findById(req.params.id);
        if (!asiento) {
            logger.warn(`AsientosController:deleteAsiento Not found id=${req.params.id}`);
            return res.status(404).json({ error: 'Asiento not found' });
        }

        const userId = req.body.updated_by || null;
        await Asientos.softDelete(req.params.id, userId);

        logger.info(`AsientosController:deleteAsiento Soft deleted id=${req.params.id}`);
        res.status(204).json({ message: 'Asiento eliminado correctamente' });
    } catch (error) {
        logger.error(`AsientosController:deleteAsiento Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

/**
 * Obtiene todos los asientos.
 */
export const getAllAsientos = async (req, res, next) => {
    try {
        const asientos = await Asientos.getAll();
        logger.info(`AsientosController:getAllAsientos Retrieved ${asientos.length} asientos`);
        res.json({ data: asientos });
    } catch (error) {
        logger.error(`AsientosController:getAllAsientos Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

/**
 * Asigna múltiples asientos a un vehículo en una sola llamada.
 * 
 * Se espera que req.body contenga:
 * {
 *   idvehiculo: number,
 *   asientos: [
 *     { fila: 1, columna: 'A', tipo_asiento: 'Ventana', ... },
 *     { fila: 1, columna: 'B', ... },
 *     ...
 *   ]
 * }
 */
export const assignAsientosToVehicle = async (req, res, next) => {

    try {
        const { asientos } = req.body;
        const { id } = req.params;

        const connection = await pool.getConnection(); // Obtener una conexión de la pool

        if (!id || !Array.isArray(asientos)) {
            return res.status(400).json({ error: 'Datos incompletos o inválidos' });
        }

        await connection.beginTransaction(); // Iniciar la transacción

        // Array para recopilar los IDs creados
        const createdIds = [];

        for (const seatData of asientos) {
            // Agrega la FK del vehículo
            const data = { ...seatData, idvehiculo: id };
            const seatId = await Asientos.create(data, connection);
            createdIds.push(seatId);
        }

        // Confirmar la transacción si todo es exitoso
        await connection.commit();

        // Podrías retornar directamente el listado de asientos creados
        // o hacer un findById para cada ID si quieres más información.
        logger.info(`AsientosController:assignAsientosToVehicle -> vehiculo=${id}, asientosCreados=${createdIds.length}`);
        return res.status(201).json({
            message: 'Asientos asignados correctamente',
            asientosCreados: createdIds
        });
    } catch (error) {
        // Si ocurre un error, revertimos la transacción
        await connection.rollback();

        logger.error(`AsientosController:assignAsientosToVehicle Error: ${error.message}`, { stack: error.stack });
        return next(error);
    } finally {
        connection.release(); // Liberar la conexión
    }
};

export const getAsientosToVehicle = async (req, res, next) => {
    try {
        const asientos = await Asientos.getByVehicle(req.params.id);
        logger.info(`AsientosController:getAsientosToVehicle Retrieved ${asientos.length} asientos`);
        res.json({ data: asientos });
    } catch (error) {
        logger.error(`AsientosController:getAsientosToVehicle Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};
