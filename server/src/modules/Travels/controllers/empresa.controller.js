import { Empresa } from '../models/travel.model.js';
import logger from '../../../utils/logger.js';

export const createEmpresa = async (req, res, next) => {
    try {
        const { nombre, direccion, telefono, ruc } = req.body;
        const created_by = req.user?.id ?? null;
        const idEmpresa = await Empresa.create({ nombre, direccion, telefono, ruc, created_by });
        const empresa = await Empresa.findById(idEmpresa);

        logger.info(`EmpresaController:createEmpresa Created id=${idEmpresa}`);
        res.status(201).json({ data: empresa });
    } catch (error) {
        logger.error(`EmpresaController:createEmpresa Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const getAllEmpresas = async (req, res, next) => {
    try {
        const empresas = await Empresa.getAll();
        logger.info(`EmpresaController:getAllEmpresas Retrieved ${empresas.length} empresas`);
        res.json({ data: empresas });
    } catch (error) {
        logger.error(`EmpresaController:getAllEmpresas Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const getEmpresa = async (req, res, next) => {
    try {
        const empresa = await Empresa.findById(req.params.id);
        if (!empresa) return res.status(404).json({ error: 'Empresa not found' });
        res.json({ data: empresa });
    } catch (error) {
        logger.error(`EmpresaController:getEmpresa Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const updateEmpresa = async (req, res, next) => {
    try {
        const updated_by = req.user?.id ?? null;

        const fields = {};
        const { nombre, direccion, telefono, ruc } = req.body;
        if (nombre) fields.nombre = nombre;
        if (direccion) fields.direccion = direccion;
        if (telefono) fields.telefono = telefono;
        if (ruc) fields.ruc = ruc;

        await Empresa.update(req.params.id, fields, updated_by);
        const empresa = await Empresa.findById(req.params.id);

        logger.info(`EmpresaController:updateEmpresa Updated id=${req.params.id}`);
        res.json({ data: empresa });
    } catch (error) {
        logger.error(`EmpresaController:updateEmpresa Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const deleteEmpresa = async (req, res, next) => {
    try {
        const updated_by = req.user?.id ?? null;

        await Empresa.softDelete(req.params.id, updated_by);
        logger.info(`EmpresaController:deleteEmpresa Soft deleted id=${req.params.id}`);
        res.status(204).send();
    } catch (error) {
        logger.error(`EmpresaController:deleteEmpresa Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};
