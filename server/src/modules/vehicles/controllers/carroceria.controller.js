import { Carroceria } from '../models/vehicle.model.js';
import logger from '../../../utils/logger.js';

export const createCarroceria = async (req, res, next) => {
    try {
        const { tipo_carroceria } = req.body;

        const insertedId = await Carroceria.create({ tipo_carroceria });
        const newCarroceria = await Carroceria.findById(insertedId);

        logger.info(`CarroceriaController:createCarroceria -> id=${insertedId}`);
        return res.status(201).json({ data: newCarroceria });
    } catch (error) {
        logger.error(`CarroceriaController:createCarroceria Error: ${error.message}`, { stack: error.stack });
        return next(error);
    }
};

export const showCarroceria = async (req, res, next) => {
    try {
        const { id } = req.params;
        const carroceria = await Carroceria.findById(id);

        if (!carroceria) {
            return res.status(404).json({ error: 'Carrocería no encontrada' });
        }

        return res.json({ data: carroceria });
    } catch (error) {
        logger.error(`CarroceriaController:showCarroceria Error: ${error.message}`, { stack: error.stack });
        return next(error);
    }
};

export const updateCarroceria = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existe = await Carroceria.findById(id);

        if (!existe) {
            return res.status(404).json({ error: 'Carrocería no encontrada' });
        }

        await Carroceria.update(id, req.body);
        const updated = await Carroceria.findById(id);

        return res.json({ data: updated });
    } catch (error) {
        logger.error(`CarroceriaController:updateCarroceria Error: ${error.message}`, { stack: error.stack });
        return next(error);
    }
};

export const softDeleteCarroceria = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existe = await Carroceria.findById(id);

        if (!existe) {
            return res.status(404).json({ error: 'Carrocería no encontrada' });
        }

        await Carroceria.softDelete(id);
        return res.json({ message: 'Carrocería eliminada' });
    } catch (error) {
        logger.error(`CarroceriaController:softDeleteCarroceria Error: ${error.message}`, { stack: error.stack });
        return next(error);
    }
};

export const getAllCarrocerias = async (req, res, next) => {
    try {
        const carrocerias = await Carroceria.getAll();
        return res.json({ data: carrocerias });
    } catch (error) {
        logger.error(`CarroceriaController:getAllCarrocerias Error: ${error.message}`, { stack: error.stack });
        return next(error);
    }
};
