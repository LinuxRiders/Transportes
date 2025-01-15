import { LugarTuristico } from '../models/lugarTuristico.model.js';
import logger from '../../../utils/logger.js';

export const createLugarTuristico = async (req, res, next) => {
  try {
    const { nombre, descripcion, ubicacion, categoria_id } = req.body;
    const created_by = req.user.id || null;

    const idLugarTuristico = await LugarTuristico.create({
      nombre,
      descripcion,
      ubicacion,
      categoria_id,
      created_by
    });

    const lugarTuristico = await LugarTuristico.findById(idLugarTuristico);

    logger.info(`LugarTuristicoController:createLugarTuristico Created id=${idLugarTuristico}`);
    res.status(201).json({ data: lugarTuristico });
  } catch (error) {
    logger.error(`LugarTuristicoController:createLugarTuristico Error: ${error.message}`, { stack: error.stack });
    next(error);
  }
};

export const getAllLugaresTuristicos = async (req, res, next) => {
  try {
    const lugaresTuristicos = await LugarTuristico.getAll();
    logger.info(
      `LugarTuristicoController:getAllLugaresTuristicos Retrieved ${lugaresTuristicos.length} lugares turísticos`
    );
    res.json({ data: lugaresTuristicos });
  } catch (error) {
    logger.error(`LugarTuristicoController:getAllLugaresTuristicos Error: ${error.message}`, { stack: error.stack });
    next(error);
  }
};

export const getLugarTuristico = async (req, res, next) => {
  try {
    const lugarTuristico = await LugarTuristico.findById(req.params.id);
    if (!lugarTuristico) return res.status(404).json({ error: 'Lugar turístico no encontrado' });
    res.json({ data: lugarTuristico });
  } catch (error) {
    logger.error(`LugarTuristicoController:getLugarTuristico Error: ${error.message}`, { stack: error.stack });
    next(error);
  }
};

export const updateLugarTuristico = async (req, res, next) => {
  try {
    const fields = {};
    if (req.body.nombre) fields.nombre = req.body.nombre;
    if (req.body.descripcion) fields.descripcion = req.body.descripcion;
    if (req.body.ubicacion) fields.ubicacion = req.body.ubicacion;
    if (req.body.categoria_id) fields.categoria_id = req.body.categoria_id;

    const updated_by = req.user.id || null;

    await LugarTuristico.update(req.params.id, fields, updated_by);
    const lugarTuristico = await LugarTuristico.findById(req.params.id);

    logger.info(`LugarTuristicoController:updateLugarTuristico Updated id=${req.params.id}`);
    res.json({ data: lugarTuristico });
  } catch (error) {
    logger.error(`LugarTuristicoController:updateLugarTuristico Error: ${error.message}`, { stack: error.stack });
    next(error);
  }
};

export const deleteLugarTuristico = async (req, res, next) => {
  try {
    const updated_by = req.user.id || null;

    await LugarTuristico.softDelete(req.params.id, updated_by);
    logger.info(`LugarTuristicoController:deleteLugarTuristico Soft deleted id=${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`LugarTuristicoController:deleteLugarTuristico Error: ${error.message}`, { stack: error.stack });
    next(error);
  }
};
