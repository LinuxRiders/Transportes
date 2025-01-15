
import { MarcaVehiculo } from '../models/vehicle.model.js';
import logger from '../../../utils/logger.js';

export const createMarcaVehiculo = async (req, res, next) => {
    try {
        const { marca, descripcion } = req.body;
        const created_by = req.user.id || null;
        const idMarca = await MarcaVehiculo.create({ marca, descripcion, created_by });
        const marcaVehiculo = await MarcaVehiculo.findById(idMarca);

        logger.info(`MarcaVehiculoController:createMarcaVehiculo Created id=${idMarca}`);
        res.status(201).json({ data: marcaVehiculo });
    } catch (error) {
        logger.error(`MarcaVehiculoController:createMarcaVehiculo Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const getAllMarcaVehiculo = async (req, res, next) => {
    try {
        const marcas = await MarcaVehiculo.getAll();

        logger.info(`MarcaVehiculoController:getAllMarcaVehiculo Retrieved ${marcas.length} marcaVehiculo`);
        res.json({ data: marcas });
    } catch (error) {
        logger.error(`MarcaVehiculoController:getAllMarcaVehiculo Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const getMarcaVehiculo = async (req, res, next) => {
    try {
        const marca = await MarcaVehiculo.findById(req.params.id);

        if (!marca) {
            logger.warn(`MarcaVehiculoController:getMarcaVehiculo Not found id=${req.params.id}`);
            return res.status(404).json({ error: 'MarcaVehiculo not found' });
        }

        res.json({ data: marca });
    } catch (error) {
        logger.error(`MarcaVehiculoController:getMarcaVehiculo Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const updateMarcaVehiculo = async (req, res, next) => {
    try {
        const marca = await MarcaVehiculo.findById(req.params.id);
        if (!marca) {
            logger.warn(`MarcaVehiculoController:updateMarcaVehiculo Not found id=${req.params.id}`);
            return res.status(404).json({ error: 'MarcaVehiculo not found' });
        }

        const fields = {};
        if (req.body.marca) fields.marca = req.body.marca;
        if (req.body.descripcion) fields.descripcion = req.body.descripcion;

        const updated_by = req.user.id || null;

        if (Object.keys(fields).length > 0) {
            await MarcaVehiculo.update(req.params.id, fields, updated_by);
        }

        const updatedMarca = await MarcaVehiculo.findById(req.params.id);

        logger.info(`MarcaVehiculoController:updateMarcaVehiculo Updated id=${req.params.id}`);
        res.json({ data: updatedMarca });
    } catch (error) {
        logger.error(`MarcaVehiculoController:updateMarcaVehiculo Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const deleteMarcaVehiculo = async (req, res, next) => {
    try {
        const marca = await MarcaVehiculo.findById(req.params.id);

        if (!marca) {
            logger.warn(`MarcaVehiculoController:deleteMarcaVehiculo Not found id=${req.params.id}`);
            return res.status(404).json({ error: 'MarcaVehiculo not found' });
        }

        const updated_by = req.user.id || null;
        await MarcaVehiculo.softDelete(req.params.id, updated_by);

        logger.info(`MarcaVehiculoController:deleteMarcaVehiculo Soft deleted id=${req.params.id}`);
        res.status(204).send();
    } catch (error) {
        logger.error(`MarcaVehiculoController:deleteMarcaVehiculo Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};