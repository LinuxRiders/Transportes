// controllers/transmision.controller.js
import { Transmision } from '../models/vehicle.model.js';
import logger from '../../../utils/logger.js';

export const createTransmision = async (req, res, next) => {
    try {
        const { tipo_transmision } = req.body;
        const created_by = req.user?.id ?? null;
        const idTransmision = await Transmision.create({ tipo_transmision, created_by });
        const transmision = await Transmision.findById(idTransmision);

        logger.info(`TransmisionController:createTransmision Created id=${idTransmision}`);
        res.status(201).json({ data: transmision });
    } catch (error) {
        logger.error(`TransmisionController:createTransmision Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const getAllTransmisiones = async (req, res, next) => {
    try {
        const transmisiones = await Transmision.getAll();

        logger.info(`TransmisionController:getAllTransmisiones Retrieved ${transmisiones.length} transmisiones`);
        res.json({ data: transmisiones });
    } catch (error) {
        logger.error(`TransmisionController:getAllTransmisiones Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const getTransmision = async (req, res, next) => {
    try {
        const transmision = await Transmision.findById(req.params.id);
        if (!transmision) {
            logger.warn(`TransmisionController:getTransmision Not found id=${req.params.id}`);
            return res.status(404).json({ error: 'Transmision not found' });
        }

        res.json({ data: transmision });
    } catch (error) {
        logger.error(`TransmisionController:getTransmision Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const updateTransmision = async (req, res, next) => {
    try {
        const transmision = await Transmision.findById(req.params.id);
        if (!transmision) {
            logger.warn(`TransmisionController:updateTransmision Not found id=${req.params.id}`);
            return res.status(404).json({ error: 'Transmision not found' });
        }

        const fields = {};
        if (req.body.tipo_transmision) fields.tipo_transmision = req.body.tipo_transmision;
        const updated_by = req.user?.id ?? null;

        if (Object.keys(fields).length > 0) {
            await Transmision.update(req.params.id, fields, updated_by);
        }

        const updatedTransmision = await Transmision.findById(req.params.id);
        logger.info(`TransmisionController:updateTransmision Updated id=${req.params.id}`);
        res.json({ data: updatedTransmision });
    } catch (error) {
        logger.error(`TransmisionController:updateTransmision Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const deleteTransmision = async (req, res, next) => {
    try {
        const transmision = await Transmision.findById(req.params.id);

        if (!transmision) {
            logger.warn(`TransmisionController:deleteTransmision Not found id=${req.params.id}`);
            return res.status(404).json({ error: 'Transmision not found' });
        }

        const updated_by = req.user?.id ?? null;
        await Transmision.softDelete(req.params.id, updated_by);

        logger.info(`TransmisionController:deleteTransmision Soft deleted id=${req.params.id}`);
        res.status(204).send();
    } catch (error) {
        logger.error(`TransmisionController:deleteTransmision Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};
