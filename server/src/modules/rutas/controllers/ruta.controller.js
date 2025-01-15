import { Ruta } from '../models/ruta.model.js';
import logger from '../../../utils/logger.js';

export const createRuta = async (req, res, next) => {
  try {
    const { nombre_ruta, descripcion, duracion, precio } = req.body;
    const created_by = req.user.id || null;

    const idRuta = await Ruta.create({ nombre_ruta, descripcion, duracion, precio, created_by });
    const ruta = await Ruta.findById(idRuta);

    logger.info(`RutaController:createRuta Created id=${idRuta}`);
    res.status(201).json({ data: ruta });
  } catch (error) {
    logger.error(`RutaController:createRuta Error: ${error.message}`, { stack: error.stack });
    next(error);
  }
};

export const getAllRutas = async (req, res, next) => {
  try {
    const rutas = await Ruta.getAll();
    logger.info(`RutaController:getAllRutas Retrieved ${rutas.length} rutas`);
    res.json({ data: rutas });
  } catch (error) {
    logger.error(`RutaController:getAllRutas Error: ${error.message}`, { stack: error.stack });
    next(error);
  }
};

export const getRuta = async (req, res, next) => {
  try {
    const ruta = await Ruta.findById(req.params.id);
    if (!ruta) return res.status(404).json({ error: 'Ruta not found' });
    res.json({ data: ruta });
  } catch (error) {
    logger.error(`RutaController:getRuta Error: ${error.message}`, { stack: error.stack });
    next(error);
  }
};

export const updateRuta = async (req, res, next) => {
  try {
    const updated_by = req.user.id || null;

    const fields = {};
    if (req.body.nombre_ruta) fields.nombre_ruta = req.body.nombre_ruta;
    if (req.body.descripcion) fields.descripcion = req.body.descripcion;
    if (req.body.duracion) fields.duracion = req.body.duracion;
    if (req.body.precio) fields.precio = req.body.precio;


    await Ruta.update(req.params.id, fields, updated_by);
    const ruta = await Ruta.findById(req.params.id);

    logger.info(`RutaController:updateRuta Updated id=${req.params.id}`);
    res.json({ data: ruta });
  } catch (error) {
    logger.error(`RutaController:updateRuta Error: ${error.message}`, { stack: error.stack });
    next(error);
  }
};

export const deleteRuta = async (req, res, next) => {
  try {
    const updated_by = req.user.id || null;

    await Ruta.softDelete(req.params.id, updated_by);
    logger.info(`RutaController:deleteRuta Soft deleted id=${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`RutaController:deleteRuta Error: ${error.message}`, { stack: error.stack });
    next(error);
  }
};
