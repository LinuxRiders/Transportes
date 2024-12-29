
import { MarcaVehiculo } from '../models/vehicle.model.js';
import logger from '../utils/logger.js';

export const createMarca = async (req, res, next) => {
    try {
        const { marca, descripcion } = req.body;

        const insertedId = await MarcaVehiculo.create({ marca, descripcion });
        const newMarca = await MarcaVehiculo.findById(insertedId);

        logger.info(`MarcaVehiculoController:createMarca -> id=${insertedId}`);
        return res.status(201).json({ data: newMarca });
    } catch (error) {
        logger.error(`MarcaVehiculoController:createMarca Error: ${error.message}`, { stack: error.stack });
        return next(error);
    }
};

export const showMarca = async (req, res, next) => {
    try {
        const { id } = req.params;
        const marca = await MarcaVehiculo.findById(id);

        if (!marca) {
            return res.status(404).json({ error: 'Marca no encontrada' });
        }

        return res.json({ data: marca });
    } catch (error) {
        logger.error(`MarcaVehiculoController:showMarca Error: ${error.message}`, { stack: error.stack });
        return next(error);
    }
};

export const updateMarca = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existe = await MarcaVehiculo.findById(id);

        if (!existe) {
            return res.status(404).json({ error: 'Marca no encontrada' });
        }

        // fields a actualizar vienen en req.body
        await MarcaVehiculo.update(id, req.body);
        const updated = await MarcaVehiculo.findById(id);

        return res.json({ data: updated });
    } catch (error) {
        logger.error(`MarcaVehiculoController:updateMarca Error: ${error.message}`, { stack: error.stack });
        return next(error);
    }
};

export const softDeleteMarca = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existe = await MarcaVehiculo.findById(id);

        if (!existe) {
            return res.status(404).json({ error: 'Marca no encontrada' });
        }

        await MarcaVehiculo.softDelete(id);
        return res.json({ message: 'Marca eliminada correctamente' });
    } catch (error) {
        logger.error(`MarcaVehiculoController:softDeleteMarca Error: ${error.message}`, { stack: error.stack });
        return next(error);
    }
};

export const getAllMarcas = async (req, res, next) => {
    try {
        const marcas = await MarcaVehiculo.getAll();
        return res.json({ data: marcas });
    } catch (error) {
        logger.error(`MarcaVehiculoController:getAllMarcas Error: ${error.message}`, { stack: error.stack });
        return next(error);
    }
};
