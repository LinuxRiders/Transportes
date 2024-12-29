import { Combustible } from '../models/vehicle.model.js';
import logger from '../utils/logger.js';

export const createCombustible = async (req, res, next) => {
    try {
        const { tipo_combustible } = req.body;
        const insertedId = await Combustible.create({ tipo_combustible });
        const newCombustible = await Combustible.findById(insertedId);

        logger.info(`CombustibleController:createCombustible -> id=${insertedId}`);
        return res.status(201).json({ data: newCombustible });
    } catch (error) {
        logger.error(`CombustibleController:createCombustible Error: ${error.message}`, { stack: error.stack });
        return next(error);
    }
};

export const showCombustible = async (req, res, next) => {
    try {
        const { id } = req.params;
        const combustible = await Combustible.findById(id);

        if (!combustible) {
            return res.status(404).json({ error: 'Combustible no encontrado' });
        }

        return res.json({ data: combustible });
    } catch (error) {
        logger.error(`CombustibleController:showCombustible Error: ${error.message}`, { stack: error.stack });
        return next(error);
    }
};

export const updateCombustible = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existe = await Combustible.findById(id);

        if (!existe) {
            return res.status(404).json({ error: 'Combustible no encontrado' });
        }

        await Combustible.update(id, req.body);
        const updated = await Combustible.findById(id);

        return res.json({ data: updated });
    } catch (error) {
        logger.error(`CombustibleController:updateCombustible Error: ${error.message}`, { stack: error.stack });
        return next(error);
    }
};

export const softDeleteCombustible = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existe = await Combustible.findById(id);

        if (!existe) {
            return res.status(404).json({ error: 'Combustible no encontrado' });
        }

        await Combustible.softDelete(id);
        return res.json({ message: 'Combustible eliminado' });
    } catch (error) {
        logger.error(`CombustibleController:softDeleteCombustible Error: ${error.message}`, { stack: error.stack });
        return next(error);
    }
};

export const getAllCombustibles = async (req, res, next) => {
    try {
        const lista = await Combustible.getAll();
        return res.json({ data: lista });
    } catch (error) {
        logger.error(`CombustibleController:getAllCombustibles Error: ${error.message}`, { stack: error.stack });
        return next(error);
    }
};
