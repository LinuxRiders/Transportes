import { Router } from 'express';
import {
    createTipoVehiculo,
    showTipoVehiculo,
    updateTipoVehiculo,
    softDeleteTipoVehiculo,
    getAllTipoVehiculo
} from '../controllers/tipoVehiculo.controller.js';

const router = Router();

router.post('/', createTipoVehiculo);
router.get('/', getAllTipoVehiculo);
router.get('/:id', showTipoVehiculo);
router.put('/:id', updateTipoVehiculo);
router.delete('/:id', softDeleteTipoVehiculo);

export default router;
