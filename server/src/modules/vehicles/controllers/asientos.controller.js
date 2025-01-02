import { Asientos } from '../models/vehicle.model.js';
import logger from '../../../utils/logger.js';

/**
 * Crea un asiento individual.
 */
export const createAsiento = async (req, res, next) => {
    try {
        const insertedId = await Asientos.create(req.body);
        const newAsiento = await Asientos.findById(insertedId);

        logger.info(`AsientosController:createAsiento -> id=${insertedId}`);
        return res.status(201).json({ data: newAsiento });
    } catch (error) {
        logger.error(`AsientosController:createAsiento Error: ${error.message}`, { stack: error.stack });
        return next(error);
    }
};

/**
 * Muestra la info de un asiento por ID.
 */
export const showAsiento = async (req, res, next) => {
    try {
        const { id } = req.params;
        const asiento = await Asientos.findById(id);

        if (!asiento) {
            return res.status(404).json({ error: 'Asiento no encontrado' });
        }
        return res.json({ data: asiento });
    } catch (error) {
        logger.error(`AsientosController:showAsiento Error: ${error.message}`, { stack: error.stack });
        return next(error);
    }
};

/**
 * Actualiza la info de un asiento.
 */
export const updateAsiento = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existe = await Asientos.findById(id);

        if (!existe) {
            return res.status(404).json({ error: 'Asiento no encontrado' });
        }

        await Asientos.update(id, req.body);
        const updated = await Asientos.findById(id);

        return res.json({ data: updated });
    } catch (error) {
        logger.error(`AsientosController:updateAsiento Error: ${error.message}`, { stack: error.stack });
        return next(error);
    }
};

/**
 * Elimina un asiento (físico o lógico).
 */
export const softDeleteAsiento = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existe = await Asientos.findById(id);

        if (!existe) {
            return res.status(404).json({ error: 'Asiento no encontrado' });
        }

        await Asientos.softDelete(id);
        return res.json({ message: 'Asiento eliminado correctamente' });
    } catch (error) {
        logger.error(`AsientosController:softDeleteAsiento Error: ${error.message}`, { stack: error.stack });
        return next(error);
    }
};

/**
 * Obtiene todos los asientos.
 */
export const getAllAsientos = async (req, res, next) => {
    try {
        const lista = await Asientos.getAll();
        return res.json({ data: lista });
    } catch (error) {
        logger.error(`AsientosController:getAllAsientos Error: ${error.message}`, { stack: error.stack });
        return next(error);
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
        const { idvehiculo, asientos } = req.body;

        if (!idvehiculo || !Array.isArray(asientos)) {
            return res.status(400).json({ error: 'Datos incompletos o inválidos' });
        }

        // Array para recopilar los IDs creados
        const createdIds = [];

        for (const seatData of asientos) {
            // Agrega la FK del vehículo
            const data = { ...seatData, idvehiculo };
            const seatId = await Asientos.create(data);
            createdIds.push(seatId);
        }

        // Podrías retornar directamente el listado de asientos creados
        // o hacer un findById para cada ID si quieres más información.
        logger.info(`AsientosController:assignAsientosToVehicle -> vehiculo=${idvehiculo}, asientosCreados=${createdIds.length}`);
        return res.status(201).json({
            message: 'Asientos asignados correctamente',
            asientosCreados: createdIds
        });
    } catch (error) {
        logger.error(`AsientosController:assignAsientosToVehicle Error: ${error.message}`, { stack: error.stack });
        return next(error);
    }
};
