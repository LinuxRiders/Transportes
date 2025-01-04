import { Combustible } from '../models/vehicle.model.js';
import logger from '../../../utils/logger.js';

export const createCombustible = async (req, res, next) => {
    try {
        const { tipo_combustible, created_by } = req.body;
        const idCombustible = await Combustible.create({
            tipo_combustible,
            created_by
        });
        const combustible = await Combustible.findById(idCombustible);

        logger.info(`CombustibleController:createCombustible Created id=${idCombustible}`);
        res.status(201).json({ data: combustible });
    } catch (error) {
        logger.error(`CombustibleController:createCombustible Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const getAllCombustibles = async (req, res, next) => {
    try {
        const combustibles = await Combustible.getAll();
        logger.info(`CombustibleController:getAllCombustibles Retrieved ${combustibles.length} combustibles`);
        res.json({ data: combustibles });
    } catch (error) {
        logger.error(`CombustibleController:getAllCombustibles Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const getCombustible = async (req, res, next) => {
    try {
        const combustible = await Combustible.findById(req.params.id);
        if (!combustible) {
            logger.warn(`CombustibleController:getCombustible Not found id=${req.params.id}`);
            return res.status(404).json({ error: 'Combustible not found' });
        }

        res.json({ data: combustible });
    } catch (error) {
        logger.error(`CombustibleController:getCombustible Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const updateCombustible = async (req, res, next) => {
    try {
        const combustible = await Combustible.findById(req.params.id);
        if (!combustible) {
            logger.warn(`CombustibleController:updateCombustible Not found id=${req.params.id}`);
            return res.status(404).json({ error: 'Combustible not found' });
        }

        const fields = {};
        if (req.body.tipo_combustible) fields.tipo_combustible = req.body.tipo_combustible;

        const updated_by = req.body.updated_by || null;
        if (Object.keys(fields).length > 0) {
            await Combustible.update(req.params.id, fields, updated_by);
        }

        const updatedCombustible = await Combustible.findById(req.params.id);
        logger.info(`CombustibleController:updateCombustible Updated id=${req.params.id}`);
        res.json({ data: updatedCombustible });
    } catch (error) {
        logger.error(`CombustibleController:updateCombustible Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const deleteCombustible = async (req, res, next) => {
    try {
        const combustible = await Combustible.findById(req.params.id);
        if (!combustible) {
            logger.warn(`CombustibleController:deleteCombustible Not found id=${req.params.id}`);
            return res.status(404).json({ error: 'Combustible not found' });
        }

        const userId = req.body.updated_by || null;
        await Combustible.softDelete(req.params.id, userId);

        logger.info(`CombustibleController:deleteCombustible Soft deleted id=${req.params.id}`);
        res.status(204).json({ message: 'Combustible eliminado' });
    } catch (error) {
        logger.error(`CombustibleController:deleteCombustible Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

