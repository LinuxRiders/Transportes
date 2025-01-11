import { Viaje } from '../models/travel.model.js';
import logger from '../../../utils/logger.js';

export const createViaje = async (req, res, next) => {
    try {
        const { id_terminal_origen, id_terminal_destino, id_vehiculo, fecha_hora_salida, fecha_hora_llegada, estado, created_by } = req.body;
        const idViaje = await Viaje.create({ id_terminal_origen, id_terminal_destino, id_vehiculo, fecha_hora_salida, fecha_hora_llegada, estado, created_by });
        const viaje = await Viaje.findById(idViaje);

        logger.info(`ViajeController:createViaje Created id=${idViaje}`);
        res.status(201).json({ data: viaje });
    } catch (error) {
        logger.error(`ViajeController:createViaje Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const getAllViajes = async (req, res, next) => {
    try {
        const viajes = await Viaje.getAll();
        logger.info(`ViajeController:getAllViajes Retrieved ${viajes.length} viajes`);
        res.json({ data: viajes });
    } catch (error) {
        logger.error(`ViajeController:getAllViajes Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const getViaje = async (req, res, next) => {
    try {
        const viaje = await Viaje.findById(req.params.id);
        if (!viaje) return res.status(404).json({ error: 'Viaje not found' });
        res.json({ data: viaje });
    } catch (error) {
        logger.error(`ViajeController:getViaje Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const updateViaje = async (req, res, next) => {
    try {
        const fields = {};
        if (req.body.id_terminal_origen) fields.id_terminal_origen = req.body.id_terminal_origen;
        if (req.body.id_terminal_destino) fields.id_terminal_destino = req.body.id_terminal_destino;
        if (req.body.id_vehiculo) fields.id_vehiculo = req.body.id_vehiculo;
        if (req.body.fecha_hora_salida) fields.fecha_hora_salida = req.body.fecha_hora_salida;
        if (req.body.fecha_hora_llegada) fields.fecha_hora_llegada = req.body.fecha_hora_llegada;
        if (req.body.estado) fields.estado = req.body.estado;

        await Viaje.update(req.params.id, fields, req.body.updated_by);
        const viaje = await Viaje.findById(req.params.id);

        logger.info(`ViajeController:updateViaje Updated id=${req.params.id}`);
        res.json({ data: viaje });
    } catch (error) {
        logger.error(`ViajeController:updateViaje Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const deleteViaje = async (req, res, next) => {
    try {
        await Viaje.softDelete(req.params.id, req.body.updated_by);
        logger.info(`ViajeController:deleteViaje Soft deleted id=${req.params.id}`);
        res.status(204).send();
    } catch (error) {
        logger.error(`ViajeController:deleteViaje Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};
