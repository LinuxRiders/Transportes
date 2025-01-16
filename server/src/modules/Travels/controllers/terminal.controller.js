import { Terminal } from '../models/travel.model.js';
import logger from '../../../utils/logger.js';

export const createTerminal = async (req, res, next) => {
    try {
        const { nombre, direccion, id_empresa, id_ciudad } = req.body;
        const created_by = req.user?.id ?? null;
        const idTerminal = await Terminal.create({ nombre, direccion, id_empresa, id_ciudad, created_by });
        const terminal = await Terminal.findById(idTerminal);

        logger.info(`TerminalController:createTerminal Created id=${idTerminal}`);
        res.status(201).json({ data: terminal });
    } catch (error) {
        logger.error(`TerminalController:createTerminal Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const getAllTerminales = async (req, res, next) => {
    try {
        const terminales = await Terminal.getAll();
        logger.info(`TerminalController:getAllTerminales Retrieved ${terminales.length} terminales`);
        res.json({ data: terminales });
    } catch (error) {
        logger.error(`TerminalController:getAllTerminales Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const getTerminal = async (req, res, next) => {
    try {
        const terminal = await Terminal.findById(req.params.id);
        if (!terminal) return res.status(404).json({ error: 'Terminal not found' });
        res.json({ data: terminal });
    } catch (error) {
        logger.error(`TerminalController:getTerminal Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const updateTerminal = async (req, res, next) => {
    try {
        const updated_by = req.user?.id ?? null;

        const fields = {};
        if (req.body.nombre) fields.nombre = req.body.nombre;
        if (req.body.direccion) fields.direccion = req.body.direccion;
        if (req.body.id_empresa) fields.id_empresa = req.body.id_empresa;
        if (req.body.id_ciudad) fields.id_ciudad = req.body.id_ciudad;

        await Terminal.update(req.params.id, fields, updated_by);
        const terminal = await Terminal.findById(req.params.id);

        logger.info(`TerminalController:updateTerminal Updated id=${req.params.id}`);
        res.json({ data: terminal });
    } catch (error) {
        logger.error(`TerminalController:updateTerminal Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const deleteTerminal = async (req, res, next) => {
    try {
        const updated_by = req.user?.id ?? null;


        await Terminal.softDelete(req.params.id, updated_by);
        logger.info(`TerminalController:deleteTerminal Soft deleted id=${req.params.id}`);
        res.status(204).send();
    } catch (error) {
        logger.error(`TerminalController:deleteTerminal Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};
