import { ColaTerminal } from '../models/travel.model.js';
import logger from '../../../utils/logger.js';

export const createCola = async (req, res, next) => {
    try {
        const { id_terminal, id_vehiculo, hora_llegada, estado } = req.body;
        const created_by = req.user?.id ?? null;
        const idCola = await ColaTerminal.create({ id_terminal, id_vehiculo, hora_llegada, estado, created_by });
        const cola = await ColaTerminal.findById(idCola);

        logger.info(`ColaTerminalController:createCola Created id=${idCola}`);
        res.status(201).json({ data: cola });
    } catch (error) {
        logger.error(`ColaTerminalController:createCola Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const getAllColas = async (req, res, next) => {
    try {
        const colas = await ColaTerminal.getAll();
        logger.info(`ColaTerminalController:getAllColas Retrieved ${colas.length} colas`);
        res.json({ data: colas });
    } catch (error) {
        logger.error(`ColaTerminalController:getAllColas Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const getCola = async (req, res, next) => {
    try {
        const cola = await ColaTerminal.findById(req.params.id);
        if (!cola) return res.status(404).json({ error: 'Cola not found' });
        res.json({ data: cola });
    } catch (error) {
        logger.error(`ColaTerminalController:getCola Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const updateCola = async (req, res, next) => {
    try {
        const updated_by = req.user?.id ?? null;

        const fields = {};
        if (req.body.id_terminal) fields.id_terminal = req.body.id_terminal;
        if (req.body.id_vehiculo) fields.id_vehiculo = req.body.id_vehiculo;
        if (req.body.hora_llegada) fields.hora_llegada = req.body.hora_llegada;
        if (req.body.estado) fields.estado = req.body.estado;

        await ColaTerminal.update(req.params.id, fields, updated_by);
        const cola = await ColaTerminal.findById(req.params.id);

        logger.info(`ColaTerminalController:updateCola Updated id=${req.params.id}`);
        res.json({ data: cola });
    } catch (error) {
        logger.error(`ColaTerminalController:updateCola Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const deleteCola = async (req, res, next) => {
    try {
        const updated_by = req.user?.id ?? null;
        await ColaTerminal.softDelete(req.params.id, updated_by);
        logger.info(`ColaTerminalController:deleteCola Soft deleted id=${req.params.id}`);
        res.status(204).send();
    } catch (error) {
        logger.error(`ColaTerminalController:deleteCola Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};
