import { TipoVehiculo } from '../models/vehicle.model.js';
import logger from '../utils/logger.js';

export const createTipoVehiculo = async (req, res, next) => {
    try {
        const { tipo_vehiculo, icono_vehiculo, idcarroceria } = req.body;
        const insertedId = await TipoVehiculo.create({
            tipo_vehiculo,
            icono_vehiculo,
            idcarroceria
        });
        const newTipo = await TipoVehiculo.findById(insertedId);

        logger.info(`TipoVehiculoController:createTipoVehiculo -> id=${insertedId}`);
        return res.status(201).json({ data: newTipo });
    } catch (error) {
        logger.error(`TipoVehiculoController:createTipoVehiculo Error: ${error.message}`, { stack: error.stack });
        return next(error);
    }
};

export const showTipoVehiculo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const tipo = await TipoVehiculo.findById(id);

        if (!tipo) {
            return res.status(404).json({ error: 'Tipo de vehículo no encontrado' });
        }

        return res.json({ data: tipo });
    } catch (error) {
        logger.error(`TipoVehiculoController:showTipoVehiculo Error: ${error.message}`, { stack: error.stack });
        return next(error);
    }
};

export const updateTipoVehiculo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existe = await TipoVehiculo.findById(id);

        if (!existe) {
            return res.status(404).json({ error: 'Tipo de vehículo no encontrado' });
        }

        await TipoVehiculo.update(id, req.body);
        const updated = await TipoVehiculo.findById(id);

        return res.json({ data: updated });
    } catch (error) {
        logger.error(`TipoVehiculoController:updateTipoVehiculo Error: ${error.message}`, { stack: error.stack });
        return next(error);
    }
};

export const softDeleteTipoVehiculo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existe = await TipoVehiculo.findById(id);

        if (!existe) {
            return res.status(404).json({ error: 'Tipo de vehículo no encontrado' });
        }

        await TipoVehiculo.softDelete(id);
        return res.json({ message: 'Tipo de vehículo eliminado' });
    } catch (error) {
        logger.error(`TipoVehiculoController:softDeleteTipoVehiculo Error: ${error.message}`, { stack: error.stack });
        return next(error);
    }
};

export const getAllTipoVehiculo = async (req, res, next) => {
    try {
        const tipos = await TipoVehiculo.getAll();
        return res.json({ data: tipos });
    } catch (error) {
        logger.error(`TipoVehiculoController:getAllTipoVehiculo Error: ${error.message}`, { stack: error.stack });
        return next(error);
    }
};
