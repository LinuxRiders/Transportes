import { Vehiculo } from '../models/vehicle.model.js';
import logger from '../../../utils/logger.js';

export const createVehiculo = async (req, res, next) => {
    try {
        // Todos los campos vienen en req.body
        const insertedId = await Vehiculo.create(req.body);
        const newVehiculo = await Vehiculo.findById(insertedId);

        logger.info(`VehiculoController:createVehiculo -> id=${insertedId}`);
        return res.status(201).json({ data: newVehiculo });
    } catch (error) {
        logger.error(`VehiculoController:createVehiculo Error: ${error.message}`, { stack: error.stack });
        return next(error);
    }
};

export const showVehiculo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const vehiculo = await Vehiculo.findById(id);

        if (!vehiculo) {
            return res.status(404).json({ error: 'Vehículo no encontrado' });
        }
        return res.json({ data: vehiculo });
    } catch (error) {
        logger.error(`VehiculoController:showVehiculo Error: ${error.message}`, { stack: error.stack });
        return next(error);
    }
};

export const updateVehiculo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existe = await Vehiculo.findById(id);

        if (!existe) {
            return res.status(404).json({ error: 'Vehículo no encontrado' });
        }

        await Vehiculo.update(id, req.body);
        const updated = await Vehiculo.findById(id);

        return res.json({ data: updated });
    } catch (error) {
        logger.error(`VehiculoController:updateVehiculo Error: ${error.message}`, { stack: error.stack });
        return next(error);
    }
};

export const softDeleteVehiculo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existe = await Vehiculo.findById(id);

        if (!existe) {
            return res.status(404).json({ error: 'Vehículo no encontrado' });
        }

        await Vehiculo.softDelete(id);
        return res.json({ message: 'Vehículo eliminado correctamente' });
    } catch (error) {
        logger.error(`VehiculoController:softDeleteVehiculo Error: ${error.message}`, { stack: error.stack });
        return next(error);
    }
};

export const getAllVehiculos = async (req, res, next) => {
    try {
        const vehiculos = await Vehiculo.getAll();
        return res.json({ data: vehiculos });
    } catch (error) {
        logger.error(`VehiculoController:getAllVehiculos Error: ${error.message}`, { stack: error.stack });
        return next(error);
    }
};
