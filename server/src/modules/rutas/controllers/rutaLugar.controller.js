import { RutaLugar } from '../models/rutaLugar.model.js';
import logger from '../../../utils/logger.js';

export const createRutaLugar = async (req, res, next) => {
  try {
    const { ruta_id, lugar_turistico_id, orden_visita, tiempo_estancia, created_by } = req.body;
    const idRutaLugar = await RutaLugar.create({
      ruta_id,
      lugar_turistico_id,
      orden_visita,
      tiempo_estancia,
      created_by
    });
    const rutaLugar = await RutaLugar.findById(idRutaLugar);

    logger.info(`RutaLugarController:createRutaLugar Created id=${idRutaLugar}`);
    res.status(201).json({ data: rutaLugar });
  } catch (error) {
    logger.error(`RutaLugarController:createRutaLugar Error: ${error.message}`, { stack: error.stack });
    next(error);
  }
};

export const getAllRutaLugares = async (req, res, next) => {
  try {
    const rutaLugares = await RutaLugar.getAll();
    logger.info(`RutaLugarController:getAllRutaLugares Retrieved ${rutaLugares.length} relaciones`);
    res.json({ data: rutaLugares });
  } catch (error) {
    logger.error(`RutaLugarController:getAllRutaLugares Error: ${error.message}`, { stack: error.stack });
    next(error);
  }
};

export const getRutaLugar = async (req, res, next) => {
  try {
    const rutaLugar = await RutaLugar.findById(req.params.id);
    if (!rutaLugar) return res.status(404).json({ error: 'Relación no encontrada' });
    res.json({ data: rutaLugar });
  } catch (error) {
    logger.error(`RutaLugarController:getRutaLugar Error: ${error.message}`, { stack: error.stack });
    next(error);
  }
};

export const updateRutaLugar = async (req, res, next) => {
  try {
    const fields = {};
    if (req.body.ruta_id) fields.ruta_id = req.body.ruta_id;
    if (req.body.lugar_turistico_id) fields.lugar_turistico_id = req.body.lugar_turistico_id;
    if (req.body.orden_visita) fields.orden_visita = req.body.orden_visita;
    if (req.body.tiempo_estancia) fields.tiempo_estancia = req.body.tiempo_estancia;

    await RutaLugar.update(req.params.id, fields, req.body.updated_by);
    const rutaLugar = await RutaLugar.findById(req.params.id);

    logger.info(`RutaLugarController:updateRutaLugar Updated id=${req.params.id}`);
    res.json({ data: rutaLugar });
  } catch (error) {
    logger.error(`RutaLugarController:updateRutaLugar Error: ${error.message}`, { stack: error.stack });
    next(error);
  }
};

export const deleteRutaLugar = async (req, res, next) => {
  try {
    await RutaLugar.softDelete(req.params.id, req.body.updated_by);
    logger.info(`RutaLugarController:deleteRutaLugar Soft deleted id=${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`RutaLugarController:deleteRutaLugar Error: ${error.message}`, { stack: error.stack });
    next(error);
  }
};
