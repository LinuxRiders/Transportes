import { Vehiculo } from '../models/vehicle.model.js';
import logger from '../../../utils/logger.js';

export const createVehiculo = async (req, res, next) => {
    try {
        // Extrae campos necesarios de la request
        const {
            capacidad_asientos,
            capacidad_maletas,
            anio_fabricacion,
            num_chasis,
            placa,
            modelo,
            kilometraje_actual,
            fecha_compra,
            estado,
            fotos_vehiculo,
            id_marca,
            idtransmision,
            idtipo_vehiculo,
            idcombustible,
            created_by // o req.user.id, si usas auth
        } = req.body;

        const idVehiculo = await Vehiculo.create({
            capacidad_asientos,
            capacidad_maletas,
            anio_fabricacion,
            num_chasis,
            placa,
            modelo,
            kilometraje_actual,
            fecha_compra,
            estado,
            fotos_vehiculo,
            id_marca,
            idtransmision,
            idtipo_vehiculo,
            idcombustible,
            created_by
        });

        // Buscamos el vehiculo recién creado para retornarlo
        const vehiculo = await Vehiculo.findById(idVehiculo);

        logger.info(`VehiculoController:createVehiculo Created id=${idVehiculo}`);
        res.status(201).json({ data: vehiculo });
    } catch (error) {
        logger.error(`VehiculoController:createVehiculo Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const getAllVehiculos = async (req, res, next) => {
    try {
        const vehiculos = await Vehiculo.getAll();

        logger.info(`VehiculoController:getAllVehiculos Retrieved ${vehiculos.length} vehiculos`);
        res.json({ data: vehiculos });
    } catch (error) {
        logger.error(`VehiculoController:getAllVehiculos Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const getVehiculo = async (req, res, next) => {
    try {
        const vehiculo = await Vehiculo.findById(req.params.id);

        if (!vehiculo) {
            logger.warn(`VehiculoController:getVehiculo Not found id=${req.params.id}`);
            return res.status(404).json({ error: 'Vehiculo not found' });
        }

        res.json({ data: vehiculo });
    } catch (error) {
        logger.error(`VehiculoController:getVehiculo Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const updateVehiculo = async (req, res, next) => {
    try {
        // Primero verificamos que el recurso exista
        const vehiculo = await Vehiculo.findById(req.params.id);
        if (!vehiculo) {
            logger.warn(`VehiculoController:updateVehiculo Not found id=${req.params.id}`);
            return res.status(404).json({ error: 'Vehiculo not found' });
        }

        // Construimos el objeto "fields" con lo que queremos actualizar
        const fields = {};
        if (req.body.capacidad_asientos) fields.capacidad_asientos = req.body.capacidad_asientos;
        if (req.body.capacidad_maletas) fields.capacidad_maletas = req.body.capacidad_maletas;
        if (req.body.anio_fabricacion) fields.anio_fabricacion = req.body.anio_fabricacion;
        if (req.body.num_chasis) fields.num_chasis = req.body.num_chasis;
        if (req.body.placa) fields.placa = req.body.placa;
        if (req.body.modelo) fields.modelo = req.body.modelo;
        if (req.body.kilometraje_actual) fields.kilometraje_actual = req.body.kilometraje_actual;
        if (req.body.fecha_compra) fields.fecha_compra = req.body.fecha_compra;
        if (req.body.estado) fields.estado = req.body.estado;
        if (req.body.fotos_vehiculo) fields.fotos_vehiculo = req.body.fotos_vehiculo;
        if (req.body.id_marca) fields.id_marca = req.body.id_marca;
        if (req.body.idtransmision) fields.idtransmision = req.body.idtransmision;
        if (req.body.idtipo_vehiculo) fields.idtipo_vehiculo = req.body.idtipo_vehiculo;
        if (req.body.idcombustible) fields.idcombustible = req.body.idcombustible;

        // El updated_by puede venir de req.user.id o req.body.updated_by
        const updated_by = req.body.updated_by || null;

        // Si hay algo para actualizar, llamamos al modelo
        if (Object.keys(fields).length > 0) {
            await Vehiculo.update(req.params.id, fields, updated_by);
        }

        const updatedVehiculo = await Vehiculo.findById(req.params.id);

        logger.info(`VehiculoController:updateVehiculo Updated id=${req.params.id}`);
        res.json({ data: updatedVehiculo });
    } catch (error) {
        logger.error(`VehiculoController:updateVehiculo Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};

export const deleteVehiculo = async (req, res, next) => {
    try {
        const vehiculo = await Vehiculo.findById(req.params.id);

        if (!vehiculo) {
            logger.warn(`VehiculoController:deleteVehiculo Not found id=${req.params.id}`);
            return res.status(404).json({ error: 'Vehiculo not found' });
        }

        // "softDelete" => borrado lógico
        const userId = req.body.updated_by || null;
        await Vehiculo.softDelete(req.params.id, userId);

        logger.info(`VehiculoController:deleteVehiculo Soft deleted id=${req.params.id}`);
        res.status(204).send();
    } catch (error) {
        logger.error(`VehiculoController:deleteVehiculo Error: ${error.message}`, { stack: error.stack });
        next(error);
    }
};
