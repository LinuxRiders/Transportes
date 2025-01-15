import { CategoriaLugar } from '../models/categoriaLugar.model.js';
import logger from '../../../utils/logger.js';

export const createCategoriaLugar = async (req, res, next) => {
  try {
    const { nombre_categoria, descripcion } = req.body;
    const created_by = req.user.id;

    const idCategoriaLugar = await CategoriaLugar.create({ nombre_categoria, descripcion, created_by });
    const categoriaLugar = await CategoriaLugar.findById(idCategoriaLugar);

    logger.info(`CategoriaLugarController:createCategoriaLugar Created id=${idCategoriaLugar}`);
    res.status(201).json({ data: categoriaLugar });
  } catch (error) {
    logger.error(`CategoriaLugarController:createCategoriaLugar Error: ${error.message}`, { stack: error.stack });
    next(error);
  }
};

export const getAllCategoriasLugares = async (req, res, next) => {
  try {
    const categoriasLugares = await CategoriaLugar.getAll();
    logger.info(`CategoriaLugarController:getAllCategoriasLugares Retrieved ${categoriasLugares.length} categorías`);
    res.json({ data: categoriasLugares });
  } catch (error) {
    logger.error(`CategoriaLugarController:getAllCategoriasLugares Error: ${error.message}`, { stack: error.stack });
    next(error);
  }
};

export const getCategoriaLugar = async (req, res, next) => {
  try {
    const categoriaLugar = await CategoriaLugar.findById(req.params.id);
    if (!categoriaLugar) return res.status(404).json({ error: 'Categoría no encontrada' });
    res.json({ data: categoriaLugar });
  } catch (error) {
    logger.error(`CategoriaLugarController:getCategoriaLugar Error: ${error.message}`, { stack: error.stack });
    next(error);
  }
};

export const updateCategoriaLugar = async (req, res, next) => {
  try {
    const fields = {};
    if (req.body.nombre_categoria) fields.nombre_categoria = req.body.nombre_categoria;
    if (req.body.descripcion) fields.descripcion = req.body.descripcion;

    const updated_by = req.user.id;

    await CategoriaLugar.update(req.params.id, fields, updated_by);
    const categoriaLugar = await CategoriaLugar.findById(req.params.id);

    logger.info(`CategoriaLugarController:updateCategoriaLugar Updated id=${req.params.id}`);
    res.json({ data: categoriaLugar });
  } catch (error) {
    logger.error(`CategoriaLugarController:updateCategoriaLugar Error: ${error.message}`, { stack: error.stack });
    next(error);
  }
};

export const deleteCategoriaLugar = async (req, res, next) => {
  try {
    const updated_by = req.user.id;

    await CategoriaLugar.softDelete(req.params.id, updated_by);
    logger.info(`CategoriaLugarController:deleteCategoriaLugar Soft deleted id=${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`CategoriaLugarController:deleteCategoriaLugar Error: ${error.message}`, { stack: error.stack });
    next(error);
  }
};
