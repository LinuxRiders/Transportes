// controllers/transmision.controller.js
import { Transmision } from '../models/vehicle.model.js';
import logger from '../../../utils/logger.js';

export const createTransmision = async (req, res, next) => {
    try {
        const { tipo_transmision } = req.body;

        const insertedId = await Transmision.create({ tipo_transmision });
        const newTransmision = await Transmision.findById(insertedId);

        logger.info(`TransmisionController:createTransmision -> id=${insertedId}`);
        return res.status(201).json({ data: newTransmision });
    } catch (error) {
        logger.error(`TransmisionController:createTransmision Error: ${error.message}`, { stack: error.stack });
        return next(error);
    }
};

export const showTransmision = async (req, res, next) => {
    try {
        const { id } = req.params;
        const transmision = await Transmision.findById(id);

        if (!transmision) {
            return res.status(404).json({ error: 'Transmisión no encontrada' });
        }

        return res.json({ data: transmision });
    } catch (error) {
        logger.error(`TransmisionController:showTransmision Error: ${error.message}`, { stack: error.stack });
        return next(error);
    }
};

export const updateTransmision = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existe = await Transmision.findById(id);

        if (!existe) {
            return res.status(404).json({ error: 'Transmisión no encontrada' });
        }

        await Transmision.update(id, req.body);
        const updated = await Transmision.findById(id);

        return res.json({ data: updated });
    } catch (error) {
        logger.error(`TransmisionController:updateTransmision Error: ${error.message}`, { stack: error.stack });
        return next(error);
    }
};

export const softDeleteTransmision = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existe = await Transmision.findById(id);

        if (!existe) {
            return res.status(404).json({ error: 'Transmisión no encontrada' });
        }

        await Transmision.softDelete(id);
        return res.json({ message: 'Transmisión eliminada' });
    } catch (error) {
        logger.error(`TransmisionController:softDeleteTransmision Error: ${error.message}`, { stack: error.stack });
        return next(error);
    }
};

export const getAllTransmisiones = async (req, res, next) => {
    try {
        const transmisionList = await Transmision.getAll();
        return res.json({ data: transmisionList });
    } catch (error) {
        logger.error(`TransmisionController:getAllTransmisiones Error: ${error.message}`, { stack: error.stack });
        return next(error);
    }
};
