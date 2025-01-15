import { Carroceria } from '../models/vehicle.model.js';
import logger from '../../../utils/logger.js';

export const createCarroceria = async (req, res, next) => {
    try {
        const { tipo_carroceria } = req.body;
        const created_by = req.user.id || null;
        const idCarroceria = await Carroceria.create({ tipo_carroceria, created_by });
        const carroceria = await Carroceria.findById(idCarroceria);

        logger.info(`CarroceriaController:createCarroceria Created id=${idCarroceria}`);
        res.status(201).json({ data: carroceria });
    } catch (error) {
        logger.error(`CarroceriaController:createCarroceria Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const getAllCarrocerias = async (req, res, next) => {
    try {
        const carrocerias = await Carroceria.getAll();
        logger.info(`CarroceriaController:getAllCarrocerias Retrieved ${carrocerias.length} carrocerias`);
        res.json({ data: carrocerias });
    } catch (error) {
        logger.error(`CarroceriaController:getAllCarrocerias Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const getCarroceria = async (req, res, next) => {
    try {
        const carroceria = await Carroceria.findById(req.params.id);
        if (!carroceria) {
            logger.warn(`CarroceriaController:getCarroceria Not found id=${req.params.id}`);
            return res.status(404).json({ error: 'Carroceria not found' });
        }

        res.json({ data: carroceria });
    } catch (error) {
        logger.error(`CarroceriaController:getCarroceria Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const updateCarroceria = async (req, res, next) => {
    try {
        const carroceria = await Carroceria.findById(req.params.id);
        if (!carroceria) {
            logger.warn(`CarroceriaController:updateCarroceria Not found id=${req.params.id}`);
            return res.status(404).json({ error: 'Carroceria not found' });
        }

        const fields = {};
        if (req.body.tipo_carroceria) fields.tipo_carroceria = req.body.tipo_carroceria;
        const updated_by = req.user.id || null;

        if (Object.keys(fields).length > 0) {
            await Carroceria.update(req.params.id, fields, updated_by);
        }

        const updatedCarroceria = await Carroceria.findById(req.params.id);
        logger.info(`CarroceriaController:updateCarroceria Updated id=${req.params.id}`);
        res.json({ data: updatedCarroceria });
    } catch (error) {
        logger.error(`CarroceriaController:updateCarroceria Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const deleteCarroceria = async (req, res, next) => {
    try {
        const carroceria = await Carroceria.findById(req.params.id);
        if (!carroceria) {
            logger.warn(`CarroceriaController:deleteCarroceria Not found id=${req.params.id}`);
            return res.status(404).json({ error: 'Carroceria not found' });
        }

        const updated_by = req.user.id || null;
        await Carroceria.softDelete(req.params.id, updated_by);

        logger.info(`CarroceriaController:deleteCarroceria Soft deleted id=${req.params.id}`);
        res.status(204).send();
    } catch (error) {
        logger.error(`CarroceriaController:deleteCarroceria Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};