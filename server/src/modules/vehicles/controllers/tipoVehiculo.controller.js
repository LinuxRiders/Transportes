import { TipoVehiculo } from '../models/vehicle.model.js';
import logger from '../../../utils/logger.js';

export const createTipoVehiculo = async (req, res, next) => {
    try {
        const { tipo_vehiculo, icono_vehiculo, idcarroceria, created_by } = req.body;
        const idTipo = await TipoVehiculo.create({
            tipo_vehiculo,
            icono_vehiculo,
            idcarroceria,
            created_by
        });
        const tipo = await TipoVehiculo.findById(idTipo);

        logger.info(`TipoVehiculoController:createTipoVehiculo Created id=${idTipo}`);
        res.status(201).json({ data: tipo });
    } catch (error) {
        logger.error(`TipoVehiculoController:createTipoVehiculo Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const getAllTipoVehiculo = async (req, res, next) => {
    try {
        const tipos = await TipoVehiculo.getAll();
        logger.info(`TipoVehiculoController:getAllTipoVehiculo Retrieved ${tipos.length} tipos`);
        res.json({ data: tipos });
    } catch (error) {
        logger.error(`TipoVehiculoController:getAllTipoVehiculo Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const getTipoVehiculo = async (req, res, next) => {
    try {
        const tipo = await TipoVehiculo.findById(req.params.id);
        if (!tipo) {
            logger.warn(`TipoVehiculoController:getTipoVehiculo Not found id=${req.params.id}`);
            return res.status(404).json({ error: 'TipoVehiculo not found' });
        }

        res.json({ data: tipo });
    } catch (error) {
        logger.error(`TipoVehiculoController:getTipoVehiculo Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const updateTipoVehiculo = async (req, res, next) => {
    try {
        const tipo = await TipoVehiculo.findById(req.params.id);
        if (!tipo) {
            logger.warn(`TipoVehiculoController:updateTipoVehiculo Not found id=${req.params.id}`);
            return res.status(404).json({ error: 'TipoVehiculo not found' });
        }

        const fields = {};
        if (req.body.tipo_vehiculo) fields.tipo_vehiculo = req.body.tipo_vehiculo;
        if (req.body.icono_vehiculo) fields.icono_vehiculo = req.body.icono_vehiculo;
        if (req.body.idcarroceria) fields.idcarroceria = req.body.idcarroceria;

        const updated_by = req.body.updated_by || null;
        if (Object.keys(fields).length > 0) {
            await TipoVehiculo.update(req.params.id, fields, updated_by);
        }

        const updatedTipo = await TipoVehiculo.findById(req.params.id);
        logger.info(`TipoVehiculoController:updateTipoVehiculo Updated id=${req.params.id}`);
        res.json({ data: updatedTipo });
    } catch (error) {
        logger.error(`TipoVehiculoController:updateTipoVehiculo Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const deleteTipoVehiculo = async (req, res, next) => {
    try {
        const tipo = await TipoVehiculo.findById(req.params.id);
        if (!tipo) {
            logger.warn(`TipoVehiculoController:deleteTipoVehiculo Not found id=${req.params.id}`);
            return res.status(404).json({ error: 'TipoVehiculo not found' });
        }

        const userId = req.body.updated_by || null;
        await TipoVehiculo.softDelete(req.params.id, userId);

        logger.info(`TipoVehiculoController:deleteTipoVehiculo Soft deleted id=${req.params.id}`);
        res.status(204).json({ message: 'Tipo de vehículo eliminado' });
    } catch (error) {
        logger.error(`TipoVehiculoController:deleteTipoVehiculo Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};