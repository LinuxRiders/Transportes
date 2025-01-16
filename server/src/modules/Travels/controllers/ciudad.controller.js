import { Ciudad } from '../models/travel.model.js';
import logger from '../../../utils/logger.js';

export const createCiudad = async (req, res, next) => {
    try {
        const { nombre } = req.body;
        const created_by = req.user.id;

        const idCiudad = await Ciudad.create({ nombre, created_by });
        const ciudad = await Ciudad.findById(idCiudad);

        logger.info(`CiudadController:createCiudad Created id=${idCiudad}`);
        res.status(201).json({ data: ciudad });
    } catch (error) {
        logger.error(`CiudadController:createCiudad Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const getAllCiudades = async (req, res, next) => {
    try {
        const ciudades = await Ciudad.getAll();
        logger.info(`CiudadController:getAllCiudades Retrieved ${ciudades.length} ciudades`);
        res.json({ data: ciudades });
    } catch (error) {
        logger.error(`CiudadController:getAllCiudades Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const getCiudad = async (req, res, next) => {
    try {
        const ciudad = await Ciudad.findById(req.params.id);
        if (!ciudad) return res.status(404).json({ error: 'Ciudad not found' });
        res.json({ data: ciudad });
    } catch (error) {
        logger.error(`CiudadController:getCiudad Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const updateCiudad = async (req, res, next) => {
    try {
        const updated_by = req.user?.id ?? null;

        const fields = {};
        if (req.body.nombre) fields.nombre = req.body.nombre;

        await Ciudad.update(req.params.id, fields, updated_by);
        const ciudad = await Ciudad.findById(req.params.id);

        logger.info(`CiudadController:updateCiudad Updated id=${req.params.id}`);
        res.json({ data: ciudad });
    } catch (error) {
        logger.error(`CiudadController:updateCiudad Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const deleteCiudad = async (req, res, next) => {
    try {
        const updated_by = req.user?.id ?? null;

        await Ciudad.softDelete(req.params.id, updated_by);
        logger.info(`CiudadController:deleteCiudad Soft deleted id=${req.params.id}`);
        res.status(204).send();
    } catch (error) {
        logger.error(`CiudadController:deleteCiudad Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};
