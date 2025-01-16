import { Viaje } from '../models/viaje.model.js';
import logger from '../../../utils/logger.js';

export const createViaje = async (req, res, next) => {
  try {
    const { ruta_id, vehiculo_id, terminal_id_origen, terminal_id_destino, fecha_inicio, fecha_fin, estado } = req.body;
    const created_by = req.user?.id ?? null;

    const idViaje = await Viaje.create({
      ruta_id,
      vehiculo_id,
      terminal_id_origen,
      terminal_id_destino,
      fecha_inicio,
      fecha_fin,
      estado,
      created_by
    });
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
    if (!viaje) return res.status(404).json({ error: 'Viaje no encontrado' });
    res.json({ data: viaje });
  } catch (error) {
    logger.error(`ViajeController:getViaje Error: ${error.message}`, { stack: error.stack });
    next(error);
  }
};

export const updateViaje = async (req, res, next) => {
  try {
    const updated_by = req.user?.id ?? null;

    const fields = {};
    if (req.body.ruta_id) fields.ruta_id = req.body.ruta_id;
    if (req.body.vehiculo_id) fields.vehiculo_id = req.body.vehiculo_id;
    if (req.body.terminal_id_origen) fields.terminal_id_origen = req.body.terminal_id_origen;
    if (req.body.terminal_id_destino) fields.terminal_id_destino = req.body.terminal_id_destino;
    if (req.body.fecha_inicio) fields.fecha_inicio = req.body.fecha_inicio;
    if (req.body.fecha_fin) fields.fecha_fin = req.body.fecha_fin;
    if (req.body.estado) fields.estado = req.body.estado;

    await Viaje.update(req.params.id, fields, updated_by);
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
    const updated_by = req.user?.id ?? null;

    await Viaje.softDelete(req.params.id, updated_by);
    logger.info(`ViajeController:deleteViaje Soft deleted id=${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`ViajeController:deleteViaje Error: ${error.message}`, { stack: error.stack });
    next(error);
  }
};
